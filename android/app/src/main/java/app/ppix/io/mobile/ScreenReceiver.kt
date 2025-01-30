package app.ppix.io.mobile

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.util.Log

class ScreenReceiver : BroadcastReceiver() {

    override fun onReceive(context: Context, intent: Intent) {
        when (intent.action) {
            Intent.ACTION_SCREEN_ON -> {
                Log.d("ScreenReceiver", "Tela ligada")
                // Inicie sua atividade ou serviço aqui
                startApp(context)
            }
            Intent.ACTION_SCREEN_OFF -> {
                Log.d("ScreenReceiver", "Tela desligada")
            }
            Intent.ACTION_USER_PRESENT -> {
                Log.d("ScreenReceiver", "Tela desbloqueada")
                // Inicie sua atividade ou serviço aqui
                startApp(context)
            }
        }
    }

    private fun startApp(context: Context) {
        val intent = Intent(context, MainActivity::class.java)
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        context.startActivity(intent)
    }
}