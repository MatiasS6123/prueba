import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { FirebaseServiceService } from 'src/app/service/firebase-service.service';
import { InteractionsService } from 'src/app/service/interactions.service';
import { UserI } from 'src/models/UserI';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  usuario: UserI = {
    nombre: '',
    apellido: '',
    rut: '',
    telefono: '',
    direccion: '',
    fechaNac: new Date(),
  };

  isProfileVisible = true; 
  constructor(
    private authService: AuthService,
    private router: Router,
    private inte: InteractionsService,
    private db: FirebaseServiceService
  ) {
    this.authService.getUserAuthState().subscribe((user) => {
      if (user !== null) {
        this.getUserInfo(user.uid);
      }
    });
  }

  async ngOnInit() {
    const uid = await this.authService.getUid();
    console.log('UID OnInit:', uid);
  }

  getUserInfo(uid: string) {
    const path = 'usuario';
    this.db.read<UserI>(path, uid).subscribe((res) => {
      if (res) {
        this.usuario = res;
        
      }
    });
  }

  async DeleteUsuario() {
    const res = await this.inte.ODU('Alerta', '¿Seguro que deseas eliminar tu cuenta?');
    if (res) {
      try {
        // Elimina la cuenta del servicio de autenticación
        const uid = await this.authService.getUid();
        if (uid) {
          // Elimina los datos en Firestore
          const path = 'usuario';
          await this.db.delete(path, uid);
          await this.authService.deleteCurrentUser();
          // Navega a la página de inicio después de eliminar el usuario
          this.router.navigate(['/']);
          this.inte.presentToast("Cuenta eliminada  con exito"); //mensaje de extio
        } else {
          console.error('El UID del usuario es nulo o no válido.');
        }
      } catch (error) {
        console.error('Error al eliminar el usuario:', error);
      }
    }
  }

  async actualizarDatos(usuario: UserI) {
    await this.inte.presentLoading('Actualizando'); // Muestra un componente de carga.
  
      const coleccion = 'usuario'; // Ruta de la colección en la base de datos.
  
      const uid= await this.authService.getUid();

      if(uid){
        await this.db
        .update(coleccion,uid ,usuario) // Actualiza los datos del usuario en la base de datos.
        .then(() => {
          console.log('datos actualizados')
          
        })
        .catch((error) => {
          console.error('Error al actualizar el dato:', error); // Registra un mensaje de error en caso de fallo.
        });
  
      this.inte.presentToast('Usuario Modificado con éxito'); // Muestra un mensaje Toast de éxito.
      this.inte.closeLoading(); // Cierra el componente de carga.
      }

      
    }
  }

