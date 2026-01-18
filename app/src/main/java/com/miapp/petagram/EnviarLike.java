package com.miapp.petagram;

import android.util.Log;
import okhttp3.*;

import java.io.IOException;

public class EnviarLike {

    public static void enviar(String idFoto, String idUsuario, String tokenDispositivo, String accessToken){
        OkHttpClient client = new OkHttpClient();

        MediaType JSON = MediaType.get("application/json; charset=utf-8");
        String json = "{"
                + "\"id_foto_instagram\":\""+idFoto+"\","
                + "\"id_usuario_instagram\":\""+idUsuario+"\","
                + "\"id_dispositivo\":\""+tokenDispositivo+"\","
                + "\"access_token\":\""+accessToken+"\""
                + "}";

        RequestBody body = RequestBody.create(json, JSON);
        Request request = new Request.Builder()
                .url("https://tuapp.herokuapp.com/registrar-like")
                .post(body)
                .build();

        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                Log.e("EnviarLike", "Error: " + e.getMessage());
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                if(response.isSuccessful()){
                    Log.d("EnviarLike", "Like registrado correctamente");
                } else {
                    Log.e("EnviarLike", "Error al registrar like");
                }
            }
        });
    }
}
