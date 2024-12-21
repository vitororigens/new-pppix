import android.content.pm.ApplicationInfo
import android.content.pm.PackageManager
import android.graphics.Bitmap
import android.graphics.Canvas
import android.graphics.drawable.BitmapDrawable
import android.graphics.drawable.Drawable
import android.util.Base64
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.WritableNativeArray
import com.facebook.react.bridge.WritableNativeMap
import java.io.ByteArrayOutputStream
import java.io.File

class AppListModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "AppList"
    }

    @ReactMethod
    fun getInstalledApps(promise: Promise) {
        try {
            val packageManager: PackageManager = reactApplicationContext.packageManager
            val appList: List<ApplicationInfo> = packageManager.getInstalledApplications(0)

            val appDataArray = WritableNativeArray()
            for (appInfo in appList) {
                // Filtra os aplicativos do sistema
                if (appInfo.flags and ApplicationInfo.FLAG_SYSTEM == 0) {
                    val appData = WritableNativeMap()

                    // Nome do aplicativo
                    val appName = packageManager.getApplicationLabel(appInfo).toString()
                    appData.putString("name", appName)

                    // Nome do pacote
                    appData.putString("packageName", appInfo.packageName)

                    // Ícone (convertido para base64)
                    val iconDrawable = packageManager.getApplicationIcon(appInfo)
                    val iconBitmap = getBitmapFromDrawable(iconDrawable)
                    val iconBase64 = encodeToBase64(iconBitmap)
                    appData.putString("icon", iconBase64)

                    // Tamanho do aplicativo
                    val file = File(appInfo.sourceDir)
                    val appSize = file.length() // Tamanho em bytes
                    appData.putDouble("size", appSize.toDouble() / (1024 * 1024)) // Convertido para MB

                    appDataArray.pushMap(appData)
                }
            }

            promise.resolve(appDataArray)
        } catch (e: Exception) {
            promise.reject("ERROR", e)
        }
    }

    private fun encodeToBase64(iconBitmap: Bitmap): String? {
        val byteArrayOutputStream = ByteArrayOutputStream()
        iconBitmap.compress(Bitmap.CompressFormat.PNG, 100, byteArrayOutputStream)
        val byteArray = byteArrayOutputStream.toByteArray()
        return Base64.encodeToString(byteArray, Base64.DEFAULT)
    }

    private fun getBitmapFromDrawable(drawable: Drawable): Bitmap {
        return when (drawable) {
            is BitmapDrawable -> drawable.bitmap
            else -> {
                val bitmap = Bitmap.createBitmap(drawable.intrinsicWidth, drawable.intrinsicHeight, Bitmap.Config.ARGB_8888)
                val canvas = Canvas(bitmap)
                drawable.setBounds(0, 0, canvas.width, canvas.height)
                drawable.draw(canvas)
                bitmap
            }
        }
    }
}
