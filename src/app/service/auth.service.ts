import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';  // Importación del módulo de autenticación de AngularFire
import { Router } from '@angular/router';
import { UserI } from 'src/models/UserI';


@Injectable({
  providedIn: 'root',
})
export class AuthService {


  constructor(private afAuth: AngularFireAuth, private router: Router) {
    // Constructor: Inyectamos el servicio AngularFireAuth y Router que se utilizarán en la clase.
  }

  /**
   * Iniciar sesión utilizando el correo electrónico y contraseña proporcionados.
   *
   * @param email Correo electrónico del usuario.
   * @param password Contraseña del usuario.
   * @returns Una promesa que se resuelve en `true` si el inicio de sesión es exitoso, o `false` en caso de error.
   */
  async signIn(email: string, password: string): Promise<boolean> {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password); // Utiliza el método de AngularFireAuth para iniciar sesión.
      return true;
    } catch (error) {
      console.error("Error al iniciar sesión: ", error);
      return false;
    }
  }

  /**
   * Registra un nuevo usuario utilizando el correo electrónico y contraseña proporcionados.
   *
   * @param email Correo electrónico del nuevo usuario.
   * @param password Contraseña del nuevo usuario.
   * @returns Una promesa que se resuelve en `true` si el registro es exitoso o un mensaje de error en caso de fallo.
   */
  async signUp(email: string, password: string): Promise<any> {
    try {
      await this.afAuth.createUserWithEmailAndPassword(email, password); // Utiliza el método de AngularFireAuth para registrar un nuevo usuario.
      return true;
    } catch (error) {
      if (error !== null && typeof error === 'object' && 'message' in error) {
        console.error("Error al registrar:", error.message); // Muestra el mensaje de error en la consola.
        return error.message; // Devuelve el mensaje de error.
      } else {
        console.error("Error desconocido al registrar:", error);
        return "Error desconocido al intentar registrar.";
      }
    }
  }

  /**
   * Cierra la sesión del usuario actual y redirige a la página de inicio de sesión.
   */
  async signOut(): Promise<void> {
    await this.afAuth.signOut(); // Cierra la sesión del usuario actual utilizando AngularFireAuth.
    this.router.navigate(['/login']); // Redirige al usuario a la página de inicio de sesión después de cerrar la sesión.
  }

  /**
   * Obtiene el estado de autenticación del usuario.
   *
   * @returns Un observable que proporciona información sobre si el usuario está autenticado o no.
   */
  getUserAuthState() {
    return this.afAuth.authState; // Obtiene el estado de autenticación del usuario (autenticado o no) utilizando AngularFireAuth.
  }  

  async resetPassword(email: string): Promise<string> {
    try {
      await this.afAuth.sendPasswordResetEmail(email);
      return 'success';
    } catch (error) {
      console.error('Error al enviar el correo de restablecimiento de contraseña:', error);
      return 'error';
    }
  }

  async deleteCurrentUser(): Promise<void> {
    const user = await this.afAuth.currentUser;
    if (user) {
      try {
        await user.delete();
        // El usuario ha sido eliminado con éxito
      } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        throw error;
      }
    } else {
      console.error('No se encontró un usuario autenticado.');
      throw new Error('No se encontró un usuario autenticado.');
    }
  }
    


  
  async getUid(){
    const user= await this.afAuth.currentUser;
    if(user){
      return user.uid;
    }
    else{
      return null;
    }
  } 
    
  
}

