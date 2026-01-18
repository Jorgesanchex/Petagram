package com.miapp.petagram;

import android.os.Bundle;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;

public class PerfilActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState){
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_perfil);

        String idUsuario = getIntent().getStringExtra("id_usuario_instagram");

        TextView tv = findViewById(R.id.tvPerfil);
        tv.setText("Perfil de usuario: " + idUsuario);
    }
}

