package studio.shishyan.ourdivinenest.companion;

import android.app.Application;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

public class NestApplication extends Application {
    @Override public void onCreate() {
        super.onCreate();
        FirebaseOptions options = new FirebaseOptions.Builder()
            .setProjectId("home-manager-2026")
            .setApplicationId("1:472322435541:android:4f18473057d5465238755c")
            .setApiKey("AIzaSyDStkR1PZ7yBJgDcqx-V6LioROEhkz8tY4")
            .setStorageBucket("home-manager-2026.firebasestorage.app")
            .build();
        if (FirebaseApp.getApps(this).isEmpty()) FirebaseApp.initializeApp(this, options);
    }
}
