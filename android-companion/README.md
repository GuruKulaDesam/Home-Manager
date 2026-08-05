# Our Divine Nest SMS companion

Private Android companion for direct SMS-to-Firebase synchronization. It requests `READ_SMS` and `RECEIVE_SMS`, rejects OTP messages, masks long numbers, classifies supported household signals locally, and applies them through a Firestore transaction to the configured family vault.

Build with Android SDK 35 and JDK 17:

```
gradlew assembleDebug
```

The downloadable APK is copied to `assets/downloads/our-divine-nest-sms.apk`. Preserve the signing key used for releases so upgrades install over the previous version.
