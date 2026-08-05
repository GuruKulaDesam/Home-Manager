package studio.shishyan.ourdivinenest.companion;

import android.content.Context;
import android.content.SharedPreferences;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.firestore.DocumentReference;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.SetOptions;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public final class SyncEngine {
    public static final class Message { final String sender, body; final long time; public Message(String sender, String body, long time) { this.sender=sender==null?"":sender; this.body=body==null?"":body; this.time=time; } }
    public interface Result { void done(String value); }
    private static final Pattern OTP = Pattern.compile("(?i)\\b(otp|one[ -]?time password|verification code|security code)\\b|\\b\\d{4,8}\\b.{0,24}\\b(expires|valid for)\\b");
    private static final Pattern AMOUNT = Pattern.compile("(?i)(?:rs\\.?|inr|₹)\\s*([\\d,]+(?:\\.\\d{1,2})?)");
    private SyncEngine() {}
    public static SharedPreferences preferences(Context context) { return context.getSharedPreferences("nest_sms", Context.MODE_PRIVATE); }
    public static String extractVault(String input) { Matcher matcher=Pattern.compile("(?:[?&]vault=)?([A-Za-z0-9_-]{43})").matcher(input==null?"":input); return matcher.find()?matcher.group(1):""; }

    public static void syncBatch(Context context, List<Message> messages, Result callback) {
        String vault=preferences(context).getString("vault", ""), owner=preferences(context).getString("owner", "p1");
        if (!vault.matches("[A-Za-z0-9_-]{43}")) { callback.done("Open the companion and configure the family vault first."); return; }
        FirebaseAuth auth=FirebaseAuth.getInstance();
        Runnable start=()->syncNext(vault, owner, messages, 0, 0, callback);
        if (auth.getCurrentUser()!=null) start.run(); else auth.signInAnonymously().addOnSuccessListener(value->start.run()).addOnFailureListener(error->callback.done("Firebase sign-in failed: "+error.getMessage()));
    }

    private static void syncNext(String vault, String owner, List<Message> messages, int index, int added, Result callback) {
        if (index>=messages.size()) { callback.done("SMS sync complete — "+added+" family updates added"); return; }
        Message message=messages.get(index); Map<String,Object> item=analyse(message, owner);
        if (item==null) { syncNext(vault,owner,messages,index+1,added,callback); return; }
        DocumentReference ref=FirebaseFirestore.getInstance().collection("familyVaults").document(vault).collection("state").document("current");
        FirebaseFirestore.getInstance().runTransaction(transaction->{
            Map<String,Object> root=transaction.get(ref).getData(); if(root==null) return false;
            Map<String,Object> state=map(root.get("state")); List<Map<String,Object>> suggestions=list(state.get("syncSuggestions"));
            String fingerprint=(String)item.get("sourceRef"); for(Map<String,Object> old:suggestions) if("sms".equals(old.get("source"))&&fingerprint.equals(old.get("sourceRef"))) return false;
            suggestions.add(item); state.put("syncSuggestions", suggestions); materialize(state,item);
            root.put("state",state); root.put("revision",System.currentTimeMillis()); root.put("deviceId","android-sms-companion");
            transaction.set(ref,root,SetOptions.merge()); return true;
        }).addOnSuccessListener(written->syncNext(vault,owner,messages,index+1,added+(written?1:0),callback)).addOnFailureListener(error->callback.done("Sync stopped: "+error.getMessage()));
    }

    private static Map<String,Object> analyse(Message message, String owner) {
        String body=message.body.trim(); if(body.isEmpty()||OTP.matcher(body).find()) return null;
        String lower=body.toLowerCase(Locale.ROOT), category;
        if(matches(lower,"bill","payment","due","electricity","recharge","premium")) category="bills";
        else if(matches(lower,"school","exam","class","timetable","fee","parent")) category="school";
        else if(matches(lower,"delivery","courier","order","shipped","parcel")) category="deliveries";
        else if(matches(lower,"doctor","hospital","appointment","medicine","clinic")) category="health";
        else if(matches(lower,"train","flight","booking","journey","travel")) category="travel";
        else if(matches(lower,"aadhaar","passport","government","tax","certificate")) category="government";
        else if(matches(lower,"service","maintenance","repair","home")) category="home"; else return null;
        Matcher amount=AMOUNT.matcher(body); double money=amount.find()?Double.parseDouble(amount.group(1).replace(",","")):0;
        String masked=maskLongNumbers(body);
        String received=new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSXXX",Locale.US).format(new Date(message.time));
        Map<String,Object> item=new HashMap<>(); item.put("id","sg-android-"+hash(message.sender+"|"+message.time+"|"+body).substring(0,16)); item.put("source","sms"); item.put("sourceRef",hash(message.sender+"|"+message.time+"|"+body)); item.put("personId",owner); item.put("category",category); item.put("title",label(category)+" from "+safeSender(message.sender)); item.put("summary",masked.substring(0,Math.min(300,masked.length()))); item.put("sender",safeSender(message.sender)); item.put("receivedAt",received); item.put("amount",money); item.put("status","applied"); item.put("trusted",true); item.put("urgency",lower.contains("urgent")||lower.contains("overdue")?"high":"normal"); item.put("decision","Applied automatically from family phone"); item.put("processedAt",received); item.put("appliedAt",received); return item;
    }

    private static void materialize(Map<String,Object> state, Map<String,Object> item) {
        String category=(String)item.get("category"), date=((String)item.get("receivedAt")).substring(0,10), id="android-"+((String)item.get("sourceRef")).substring(0,16);
        if("school".equals(category)) { List<Map<String,Object>> events=list(state.get("events")); events.add(record("id",id,"context","study","title",item.get("title"),"category","School","startAt",date+"T09:00","venue",item.get("sender"),"notes",item.get("summary"))); state.put("events",events); }
        else if(Arrays.asList("bills","travel","health","government").contains(category)) { List<Map<String,Object>> records=list(state.get("lifeRecords")); String domain=mapOf("bills","bills","travel","travel","health","appointments","government","documents").get(category); records.add(record("id",id,"domain",domain,"title",item.get("title"),"category",label(category),"owner","Family","provider",item.get("sender"),"reference","","amount",item.get("amount"),"dueDate",date,"frequency","Once","status","pending","phone","","notes",item.get("summary"),"createdAt",item.get("receivedAt"))); state.put("lifeRecords",records); }
        else { List<Map<String,Object>> tasks=list(state.get("tasks")); tasks.add(record("id",id,"context","home","type","reminder","title",item.get("title"),"category","deliveries".equals(category)?"Delivery":"Home service","assignee","Family","dueAt",date,"frequency","Once","priority","medium","status","todo","notes",item.get("summary"))); state.put("tasks",tasks); }
    }

    private static boolean matches(String text,String... words){for(String word:words)if(text.contains(word))return true;return false;}
    private static String maskLongNumbers(String text){Matcher matcher=Pattern.compile("(?<!\\d)(\\d{4,})(?!\\d)").matcher(text);StringBuffer out=new StringBuffer();while(matcher.find()){String digits=matcher.group(1);matcher.appendReplacement(out,Matcher.quoteReplacement("…"+digits.substring(Math.max(0,digits.length()-4))));}matcher.appendTail(out);return out.toString();}
    private static String safeSender(String sender){return sender.replaceAll("[^A-Za-z0-9 +._-]","").substring(0,Math.min(60,sender.replaceAll("[^A-Za-z0-9 +._-]","").length()));}
    private static String label(String category){return mapOf("bills","Bill or payment","school","School update","deliveries","Delivery","health","Health appointment","travel","Travel update","government","Government record","home","Home service").get(category);}
    private static String hash(String text){try{byte[] bytes=MessageDigest.getInstance("SHA-256").digest(text.getBytes(StandardCharsets.UTF_8));StringBuilder out=new StringBuilder();for(byte value:bytes)out.append(String.format("%02x",value));return out.toString();}catch(Exception error){return UUID.randomUUID().toString().replace("-","");}}
    @SuppressWarnings("unchecked") private static Map<String,Object> map(Object value){return value instanceof Map?new HashMap<>((Map<String,Object>)value):new HashMap<>();}
    @SuppressWarnings("unchecked") private static List<Map<String,Object>> list(Object value){return value instanceof List?new ArrayList<>((List<Map<String,Object>>)value):new ArrayList<>();}
    private static Map<String,Object> record(Object... values){Map<String,Object> out=new HashMap<>();for(int i=0;i<values.length;i+=2)out.put((String)values[i],values[i+1]);return out;}
    private static Map<String,String> mapOf(String... values){Map<String,String> out=new HashMap<>();for(int i=0;i<values.length;i+=2)out.put(values[i],values[i+1]);return out;}
}
