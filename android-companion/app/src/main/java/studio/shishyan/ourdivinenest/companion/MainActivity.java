package studio.shishyan.ourdivinenest.companion;

import android.Manifest;
import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;
import android.provider.Telephony;
import android.view.View;
import android.widget.*;
import java.util.ArrayList;
import java.util.List;

public class MainActivity extends Activity {
    private EditText vaultInput, ownerInput;
    private TextView status;

    @Override public void onCreate(Bundle state) {
        super.onCreate(state);
        LinearLayout root = new LinearLayout(this);
        root.setOrientation(LinearLayout.VERTICAL); root.setPadding(40, 54, 40, 40); root.setBackgroundColor(Color.rgb(244,247,245));
        TextView title = text("Our Divine Nest", 28, true); root.addView(title);
        root.addView(text("Private SMS companion", 17, false));
        root.addView(text("Reads consented messages locally, discards OTPs, and syncs only structured family updates.", 15, false));
        vaultInput = new EditText(this); vaultInput.setHint("Paste family vault link or 43-character key"); vaultInput.setSingleLine(true); root.addView(vaultInput, wide());
        ownerInput = new EditText(this); ownerInput.setHint("Family member ID (for example p1)"); ownerInput.setSingleLine(true); root.addView(ownerInput, wide());
        Button save = button("Save and enable direct SMS sync"); root.addView(save, wide());
        Button history = button("Sync existing SMS history"); root.addView(history, wide());
        status = text("Not configured", 15, true); root.addView(status);
        root.addView(text("Raw messages never leave this phone. Account numbers are masked, OTPs are ignored, and Firebase transactions prevent overwriting simultaneous family edits.", 13, false));
        setContentView(root);

        String savedVault = SyncEngine.preferences(this).getString("vault", "");
        String savedOwner = SyncEngine.preferences(this).getString("owner", "p1");
        vaultInput.setText(parameterFromIntent(getIntent(), "vault", savedVault)); ownerInput.setText(parameterFromIntent(getIntent(), "owner", savedOwner));
        if (!savedVault.isEmpty()) status.setText("Configured — new SMS sync is active");
        save.setOnClickListener(v -> saveConfiguration());
        history.setOnClickListener(v -> syncHistory());
    }

    private void saveConfiguration() {
        String vault = SyncEngine.extractVault(vaultInput.getText().toString());
        String owner = ownerInput.getText().toString().trim();
        if (!vault.matches("[A-Za-z0-9_-]{43}")) { status.setText("Enter the shared family vault link from Settings."); return; }
        if (owner.isEmpty()) owner = "p1";
        SyncEngine.preferences(this).edit().putString("vault", vault).putString("owner", owner).apply();
        if (checkSelfPermission(Manifest.permission.RECEIVE_SMS) != PackageManager.PERMISSION_GRANTED || checkSelfPermission(Manifest.permission.READ_SMS) != PackageManager.PERMISSION_GRANTED) {
            requestPermissions(new String[]{Manifest.permission.RECEIVE_SMS, Manifest.permission.READ_SMS}, 41);
        } else status.setText("Configured — new SMS sync is active");
    }

    private void syncHistory() {
        saveConfiguration();
        if (checkSelfPermission(Manifest.permission.READ_SMS) != PackageManager.PERMISSION_GRANTED) return;
        status.setText("Reading existing messages…");
        List<SyncEngine.Message> messages = new ArrayList<>();
        try (Cursor cursor = getContentResolver().query(Telephony.Sms.Inbox.CONTENT_URI, new String[]{Telephony.Sms.ADDRESS, Telephony.Sms.BODY, Telephony.Sms.DATE}, null, null, Telephony.Sms.DEFAULT_SORT_ORDER + " LIMIT 500")) {
            if (cursor != null) while (cursor.moveToNext()) messages.add(new SyncEngine.Message(cursor.getString(0), cursor.getString(1), cursor.getLong(2)));
        }
        SyncEngine.syncBatch(this, messages, result -> runOnUiThread(() -> status.setText(result)));
    }

    @Override public void onRequestPermissionsResult(int code, String[] permissions, int[] grants) {
        super.onRequestPermissionsResult(code, permissions, grants);
        status.setText(code == 41 && grants.length > 0 && grants[0] == PackageManager.PERMISSION_GRANTED ? "Configured — new SMS sync is active" : "SMS permission is required for direct sync");
    }

    private String parameterFromIntent(Intent intent, String name, String fallback) { Uri uri = intent == null ? null : intent.getData(); return uri != null && uri.getQueryParameter(name) != null ? uri.getQueryParameter(name) : fallback; }
    private TextView text(String value, int size, boolean bold) { TextView view = new TextView(this); view.setText(value); view.setTextSize(size); view.setTextColor(Color.rgb(35,48,45)); view.setPadding(0,12,0,12); if (bold) view.setTypeface(null, 1); return view; }
    private Button button(String label) { Button button = new Button(this); button.setText(label); button.setAllCaps(false); return button; }
    private LinearLayout.LayoutParams wide() { return new LinearLayout.LayoutParams(-1, -2); }
}
