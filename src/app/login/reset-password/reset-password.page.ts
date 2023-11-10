import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { InteractionsService } from 'src/app/service/interactions.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  email:string='';

  

  constructor(private auth: AuthService, private interaction:InteractionsService) { }

  ngOnInit() {
  }

  async resetPassword() {
    try {
      const result = await this.auth.resetPassword(this.email);
      if (result === 'success') {
        // El correo se envió exitosamente
        this.interaction.closeLoading();
        this.interaction.presentToast('Correo de restablecimiento de contraseña enviado correctamente');
        
  
      } else if (result === 'error') {
        // Ocurrió un error al enviar el correo
        this.interaction.closeLoading();
        this.interaction.presentToast('Ocurrió un error al enviar el correo de restablecimiento de contraseña');
      } else {
        // Otro manejo de resultados si es necesario
      }
    } catch (error) {
      console.error('Error al restablecer la contraseña:', error);
    }
  }
  

}
