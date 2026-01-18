package com.miapp.petagram;

import android.util.Log;
import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

public class MyFirebaseMessagingService extends FirebaseMessagingService {

    @Override
    public void onNewToken(String token){
        super.onNewToken(token);
        Log.d("FCM Token", token);
        // Aquí puedes enviar el token al Web Service
    }

    @Override
    public void onMessageReceived(RemoteMessage message){
        super.onMessageReceived(message);
    }
}
