package studio.shishyan.ourdivinenest.companion;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.provider.Telephony;
import android.telephony.SmsMessage;
import java.util.Collections;
import java.util.List;

public class SmsReceiver extends BroadcastReceiver {
    @Override public void onReceive(Context context, Intent intent) {
        if (!Telephony.Sms.Intents.SMS_RECEIVED_ACTION.equals(intent.getAction())) return;
        SmsMessage[] parts = Telephony.Sms.Intents.getMessagesFromIntent(intent);
        if (parts.length == 0) return;
        StringBuilder body = new StringBuilder();
        for (SmsMessage sms : parts) body.append(sms.getMessageBody());
        List<SyncEngine.Message> messages = Collections.singletonList(new SyncEngine.Message(parts[0].getOriginatingAddress(), body.toString(), parts[0].getTimestampMillis()));
        PendingResult pending = goAsync();
        SyncEngine.syncBatch(context, messages, ignored -> pending.finish());
    }
}
