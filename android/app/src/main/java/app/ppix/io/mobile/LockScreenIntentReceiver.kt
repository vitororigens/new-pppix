//LockScreenIntentReceiver.kt is a BroadcastReceiver that listens for screen on, screen off, and boot completed events. When any of these events occur, the receiver starts the MainActivity.

package app.ppix.io.mobile

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.Intent.ACTION_BOOT_COMPLETED
import android.content.Intent.ACTION_SCREEN_OFF
import android.content.Intent.ACTION_SCREEN_ON
import android.content.Intent.ACTION_USER_PRESENT
import android.util.Log

class LockScreenIntentReceiver : BroadcastReceiver() {

    override fun onReceive(context: Context, intent: Intent) {
        when (intent.action) {
            ACTION_SCREEN_OFF -> {
                Log.d("LockScreen", "Tela desligada")
                startLockscreen(context)
            }
            ACTION_SCREEN_ON -> {
                Log.d("LockScreen", "Tela ligada")
                startLockscreen(context)
            }
            ACTION_USER_PRESENT -> {
                Log.d("LockScreen", "Usuário presente")
                startLockscreen(context)
            }
            ACTION_BOOT_COMPLETED -> {
                Log.d("LockScreen", "Boot completado")
                startLockscreen(context)
            }
        }
    }

    private fun startLockscreen(context: Context) {
        val intent = Intent(context, MainActivity::class.java).apply {
            addFlags(Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP)
            putExtra("from_lockscreen", true)
        }
        context.startActivity(intent)
    }
}
