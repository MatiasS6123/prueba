import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class InteractionsService {
  
  loading: any;

  constructor(
    public toasController: ToastController,
    public loadinControl: LoadingController,
    private alertC: AlertController
  ) {
    // Constructor: Inyectamos los servicios ToastController, LoadingController y AlertController que se utilizarán en la clase.
  }

  /**
   * Muestra un mensaje de notificación tipo Toast.
   *
   * @param mensaje Mensaje que se mostrará en el Toast.
   */
  async presentToast(mensaje: string) {
    const toast = await this.toasController.create({
      message: mensaje,
      duration: 2000, // Duración en milisegundos durante la cual se mostrará el mensaje.
    });
    await toast.present();
  }

  /**
   * Muestra un componente de carga o spinner.
   *
   * @param mensaje Mensaje que se mostrará junto al componente de carga.
   */
  async presentLoading(mensaje: string) {
    this.loading = await this.loadinControl.create({
      cssClass: 'my-custom-class', // Clase CSS personalizada para el componente de carga.
      message: mensaje, // Mensaje que se mostrará junto al componente de carga.
    });
    await this.loading.present();
  }

  /**
   * Cierra el componente de carga o spinner.
   */
  async closeLoading() {
    await this.loadinControl.dismiss(); // Cierra el componente de carga.
  }

  /**
   * Muestra un cuadro de diálogo de confirmación con dos botones (Aceptar y Cancelar).
   *
   * @param texto Texto principal del cuadro de diálogo.
   * @param subt Texto secundario del cuadro de diálogo.
   * @returns Una promesa que se resuelve en `true` si se hace clic en "Aceptar" o en `false` si se hace clic en "Cancelar".
   */
  async ODU(texto: string, subt: string) {
    let aceptar = false; // Variable para almacenar la decisión del usuario.
    const alert = await this.alertC.create({
      cssClass: 'my-custom-class', // Clase CSS personalizada para el cuadro de diálogo.
      header: texto, // Texto principal del cuadro de diálogo.
      subHeader: subt, // Texto secundario del cuadro de diálogo.
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secundary', // Clase CSS para el botón de "Cancelar".
        },
        {
          text: 'Aceptar',
          handler: () => {
            aceptar = true; // Establece la variable 'aceptar' en true si se hace clic en "Aceptar".
          },
        },
      ],
    });
    await alert.present();
    await alert.onDidDismiss(); // Espera a que se cierre el cuadro de diálogo y luego devuelve el valor de 'aceptar'.
    return aceptar;
  }
 

}