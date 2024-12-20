package app.ppix.io.mobile

import android.content.Intent
import android.os.Build
import android.os.Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultReactActivityDelegate
import expo.modules.ReactActivityDelegateWrapper

class MainActivity : ReactActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        // Define o tema para AppTheme ANTES do onCreate para suportar
        // a coloração do fundo, barra de status e barra de navegação.
        // Isso é necessário para o expo-splash-screen.
        setTheme(R.style.AppTheme)
        super.onCreate(null)

        val extras = intent?.extras
        if (extras == null || extras.getInt("kill", 0) != 1) {
            try {
                startService(Intent(this, LockScreenService::class.java))
            } catch (ignored: Exception) {
            }
        }
    }

    /**
     * Retorna o nome do componente principal registrado no JavaScript. Isso é usado para agendar
     * o render do componente.
     */
    override fun getMainComponentName(): String = "main"

    /**
     * Retorna a instância do [ReactActivityDelegate]. Usamos o [DefaultReactActivityDelegate]
     * que permite ativar a Nova Arquitetura com um único booleano [fabricEnabled].
     */
    override fun createReactActivityDelegate(): ReactActivityDelegate {
        return ReactActivityDelegateWrapper(
            this,
            BuildConfig.IS_NEW_ARCHITECTURE_ENABLED,
            object : DefaultReactActivityDelegate(
                this,
                mainComponentName,
                BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
            ) {}
        )
    }

    /**
     * Alinha o comportamento do botão "voltar" com o Android S
     * onde atividades raiz são movidas para o fundo ao invés de finalizadas.
     * @see <a href="https://developer.android.com/reference/android/app/Activity#onBackPressed()">onBackPressed</a>
     */
    override fun invokeDefaultOnBackPressed() {
        if (Build.VERSION.SDK_INT <= Build.VERSION_CODES.R) {
            if (!moveTaskToBack(false)) {
                // Para atividades que não são raiz, use a implementação padrão para finalizá-las.
                super.invokeDefaultOnBackPressed()
            }
            return
        }

        // Use a implementação padrão do botão "voltar" no Android S,
        // pois ele faz mais do que [Activity.moveTaskToBack].
        super.invokeDefaultOnBackPressed()
    }
}
