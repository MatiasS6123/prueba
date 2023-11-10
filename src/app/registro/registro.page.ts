import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';  // Asegúrate de ajustar la ruta si es necesario
import { Router } from '@angular/router';
import { InteractionsService } from '../service/interactions.service';
import { UserI } from 'src/models/UserI';
import { FirebaseServiceService } from '../service/firebase-service.service';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';



@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  

  regForm:FormGroup

  /*newUsuario: UserI = {
    id:this.db.getId(),
    nombre:'',
    apellido:'',
    rut:'',
    telefono:'',
    direccion:'', 
    fechaNac:new Date 
  };*/

  // Variables para enlazar con el formulario
  

  // Mensaje de error
  errorMessage: string = '';

  constructor(private authService: AuthService,private router:Router, private interaction:
    InteractionsService, private db:FirebaseServiceService,private fb: FormBuilder) { 
      this.regForm = fb.group({
        nombre: ['', Validators.required], // Campo 'nombre' con validación requerida.
        apellido:['', Validators.required],
        rut: ['', Validators.required], // Campo 'rut' con validación requerida.
        telefono:['', Validators.required],
        direccion: ['', Validators.required], // Campo 'direccion' con validación requerida.
        fechaNac:['', Validators.required],
        correo:['',Validators.required],
        password:['',Validators.required]
      

      });
    }//Servicios a utlizar en este page

  ngOnInit(): void {
    // Código que quieres que se ejecute al inicializar la página
    // Si no hay necesidad de ejecutar algo específico al iniciar, puedes dejarlo vacío
  }

  async register() { //funcion asincronica que espera un respuesta
    if(this.regForm?.valid){
      const result = await this.authService.signUp(this.regForm.value.correo, this.regForm.value.correo); //se crea un valiriable que almacena el reaultado de la llamda al metodo
      if (result !== true) { //Validamos si el resultado es correcto o no
          this.errorMessage = result;  // Mostrar el mensaje de error
          this.interaction.closeLoading(); //se cierra pantalla de carga
          this.interaction.presentToast("Datos Incorrectos"); //Mensaje de error
      } else {
          // Acciones después de un registro exitoso
          this.interaction.closeLoading();// se cierra la pantalla de carga
          this.guardar_usuario()
          this.interaction.presentToast("Usuario Registrado con exito"); //mensaje de extio
          this.router.navigate(['/']);//Redireccion a home
      }
    }
    
}
async guardar_usuario() {
  const path = 'usuario'; // Ruta de la colección en la base de datos.
  try {
    const id = await this.authService.getUid(); // Obtiene un identificador único.

    if (id) {
      const usuarioData = {
        nombre: this.regForm.value.nombre,
        apellido: this.regForm.value.apellido,
        rut: this.regForm.value.rut,
        telefono: this.regForm.value.telefono,
        direccion: this.regForm.value.direccion,
        fechaNac: this.regForm.value.fechaNac,
        id: id,
        // Otros campos del formulario
      };

      await this.db.create(usuarioData, path, id).then(() => {
        console.log("Usuario guardado con éxito");
      });
    } else {
      console.error('ID nulo o vacío');
    }
  } catch (error) {
    console.error('Error al obtener el ID:', error);
  }
}
}
