package app.ppix.io.mobile

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent

class BootReceiver : BroadcastReceiver() {

    override fun onReceive(context: Context, intent: Intent) {
        if (intent.action == Intent.ACTION_BOOT_COMPLETED) {
            // Inicie o ScreenReceiver ou qualquer outra inicialização necessária
            val screenIntent = Intent(context, ScreenReceiver::class.java)
            context.sendBroadcast(screenIntent)
        }
    }
}