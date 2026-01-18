package com.miapp.petagram;

import android.util.Log;
import okhttp3.*;

import java.io.IOException;

public class EnviarToken {

    public static void enviar(String token, String idUsuarioInstagram){
        OkHttpClient client = new OkHttpClient();

        MediaType JSON = MediaType.get("application/json; charset=utf-8");
        String json = "{ \"id_dispositivo\":\""+token+"\", \"id_usuario_instagram\":\""+idUsuarioInstagram+"\" }";

        RequestBody body = RequestBody.create(json, JSON);
        Request request = new Request.Builder()
                .url("https://tuapp.herokuapp.com/registrar-usuario")
                .post(body)
                .build();

        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                Log.e("EnviarToken", "Error: "+e.getMessage());
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                if(response.isSuccessful()){
                    Log.d("EnviarToken", "Registrado correctamente");
                } else {
                    Log.e("EnviarToken", "Error al registrar");
                }
            }
        });
    }
}
