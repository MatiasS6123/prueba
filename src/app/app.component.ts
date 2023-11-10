import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';
import { InteractionsService } from './service/interactions.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})


export class AppComponent {
  login: boolean = false; // Variable que indica si el usuario está autenticado.
  modoOscuro: boolean = false; // Variable que indica si se utiliza el modo oscuro.
  mostrarAjustes: boolean = false;



  constructor(private auth: AuthService, private inte: InteractionsService, private platform: Platform) {
    // Constructor: Inyectamos el servicio AuthService, InteractionsService y Platform que se utilizarán en la clase.

    // Observa el estado de autenticación del usuario.
    auth.getUserAuthState().subscribe((user) => {
      if (user) {
        // El usuario está autenticado.
        console.log('Usuario autenticado', user);
        this.login = true;
      } else {
        // El usuario no está autenticado.
        console.log('Usuario no autenticado');
        this.login = false;
      }
    });
  }

  /**
   * Cierra la sesión del usuario actual.
   */

  toggleAjustes() {
    this.mostrarAjustes = !this.mostrarAjustes;
  }
  
  async logOut() {
    const res = await this.inte.ODU('Alerta', '¿Deseas cerrar sesión?'); // Muestra un cuadro de diálogo de confirmación.
    if (res) {
      this.auth
        .signOut()
        .then(() => {
          // La sesión se ha cerrado con éxito.
        })
        .catch((error) => {
          // Se produjo un error al cerrar la sesión.
          console.error('Error al cerrar sesión:', error);
        });

      this.inte.presentToast('Sesión cerrada con éxito'); // Muestra un mensaje Toast de éxito.
    }
  }

  /**
   * Inicializa la aplicación y verifica si se debe utilizar el modo oscuro.
   */
  initializeApp() {
    this.platform.ready().then(() => {
      // Verifica si el sistema admite el modo oscuro mediante 'prefers-color-scheme'.
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.modoOscuro = true; // Habilita el modo oscuro si coincide con la configuración del sistema.
      }
    });
  }

  /**
   * Cambia entre el modo oscuro y el modo claro aplicando una clase CSS al body del documento.
   */
  cambiarModoOscuro() {
    document.body.classList.toggle('dark-theme', this.modoOscuro); // Alterna la clase 'dark-theme' en el body según el estado de modoOscuro.
  }

}