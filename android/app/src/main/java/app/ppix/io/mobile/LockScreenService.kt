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

class LockScreenService : Service() {

    private var mReceiver: BroadcastReceiver? = null

    override fun onBind(intent: Intent?): IBinder? {
        return null
    }

    override fun onCreate() {
        super.onCreate()
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        val filter = IntentFilter(Intent.ACTION_SCREEN_ON).apply {
            addAction(Intent.ACTION_SCREEN_OFF)
        }
        mReceiver = LockScreenIntentReceiver()
        registerReceiver(mReceiver, filter)
        startForegroundService()
        return START_STICKY
    }

    private fun startForegroundService() {
        val CHANNEL_ID = "CHANNEL_PPPIX"

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                CHANNEL_ID,
                "PennSkanvTicChannel",
                NotificationManager.IMPORTANCE_HIGH
            ).apply {
                description = "PPPix channel for foreground service notification"
            }

            val notificationManager = getSystemService(NotificationManager::class.java)
            notificationManager?.createNotificationChannel(channel)

            val notification = NotificationCompat.Builder(this, CHANNEL_ID)
                .setContentTitle(getString(R.string.app_name))
                .setTicker(getString(R.string.app_name))
                .setContentText("Running")
                .setOngoing(true)
                .build()

            startForeground(9999, notification)
        }
    }

    override fun onDestroy() {
        super.onDestroy()
        mReceiver?.let { unregisterReceiver(it) }
    }
}
