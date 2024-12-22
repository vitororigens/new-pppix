//LockScreenIntentReceiver.kt is a BroadcastReceiver that listens for screen on, screen off, and boot completed events. When any of these events occur, the receiver starts the MainActivity.

package app.ppix.io.mobile

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.Intent.ACTION_BOOT_COMPLETED
import android.content.Intent.ACTION_SCREEN_OFF
import android.content.Intent.ACTION_SCREEN_ON

class LockScreenIntentReceiver : BroadcastReceiver() {

    override fun onReceive(context: Context, intent: Intent) {
        when (intent.action) {
            ACTION_SCREEN_OFF, ACTION_SCREEN_ON, ACTION_BOOT_COMPLETED -> {
                startLockscreen(context)
            }
        }
    }

    private fun startLockscreen(context: Context) {
        val intent = Intent(context, MainActivity::class.java).apply {
            addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        }
        context.startActivity(intent)
    }
}
