import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { InteractionsService } from '../service/interactions.service';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credenciales = {
    correo: '',
    password: '',
  } // Objeto que almacena las credenciales del usuario.

  constructor(private authService: AuthService, private interactions: InteractionsService, private router: Router) {
    // Constructor: Inyectamos el servicio AuthService, InteractionsService y Router que se utilizarán en la clase.
  }

  ngOnInit() {
  }

  /**
   * Realiza el proceso de inicio de sesión del usuario.
   */
  async login() {
    const res = await this.authService.signIn(this.credenciales.correo, this.credenciales.password).catch((error) => {
      this.interactions.closeLoading();
      this.interactions.presentToast('Credenciales incorrectas'); // Muestra un mensaje Toast si las credenciales son incorrectas.
    });
    if (res) {
      this.interactions.closeLoading();
      this.interactions.presentToast('Sesión iniciada con éxito'); // Muestra un mensaje Toast si el inicio de sesión es exitoso.
      console.log(this.authService.getUserAuthState()); // Registra el estado de autenticación del usuario en la consola.
      this.router.navigate(['/']); // Redirige al usuario a la página principal después del inicio de sesión.
    }
  } 
  

}
