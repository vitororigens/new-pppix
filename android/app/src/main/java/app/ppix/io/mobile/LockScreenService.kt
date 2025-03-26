//LockScreenService.kt

package app.ppix.io.mobile

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.Service
import android.content.BroadcastReceiver
import android.content.Intent
import android.content.IntentFilter
import android.os.Build
import android.os.IBinder
import androidx.core.app.NotificationCompat
import android.util.Log

class LockScreenService : Service() {
    private var mReceiver: BroadcastReceiver? = null
    private val CHANNEL_ID = "CHANNEL_PPPIX"
    private val NOTIFICATION_ID = 9999

    override fun onBind(intent: Intent?): IBinder? {
        return null
    }

    override fun onCreate() {
        super.onCreate()
        Log.d("LockScreenService", "Serviço criado")
        createNotificationChannel()
        registerScreenReceiver()
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        Log.d("LockScreenService", "Serviço iniciado")
        startForeground(NOTIFICATION_ID, createNotification())
        return START_STICKY
    }

    private fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                CHANNEL_ID,
                "PPPix Lock Screen",
                NotificationManager.IMPORTANCE_LOW
            ).apply {
                description = "Canal para o serviço de tela de bloqueio"
            }

            val notificationManager = getSystemService(NotificationManager::class.java)
            notificationManager?.createNotificationChannel(channel)
        }
    }

    private fun createNotification(): Notification {
        return NotificationCompat.Builder(this, CHANNEL_ID)
            .setContentTitle(getString(R.string.app_name))
            .setContentText("Serviço de tela de bloqueio ativo")
            .setSmallIcon(R.mipmap.ic_launcher)
            .setPriority(NotificationCompat.PRIORITY_LOW)
            .setOngoing(true)
            .build()
    }

    private fun registerScreenReceiver() {
        val filter = IntentFilter().apply {
            addAction(Intent.ACTION_SCREEN_ON)
            addAction(Intent.ACTION_SCREEN_OFF)
            addAction(Intent.ACTION_USER_PRESENT)
        }
        mReceiver = LockScreenIntentReceiver()
        registerReceiver(mReceiver, filter)
    }

    override fun onDestroy() {
        super.onDestroy()
        Log.d("LockScreenService", "Serviço destruído")
        mReceiver?.let { unregisterReceiver(it) }
    }
}
