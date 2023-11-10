import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { FirebaseServiceService } from 'src/app/service/firebase-service.service';
import { InteractionsService } from 'src/app/service/interactions.service';
import { StorageService } from 'src/app/service/storage.service';
import { Producto } from 'src/models/ProductoI';

@Component({
  selector: 'app-crud-productos',
  templateUrl: './crud-productos.page.html',
  styleUrls: ['./crud-productos.page.scss'],
})
export class CrudProductosPage implements OnInit {

  listaP: Producto[] = [];
  activo=false;

  newProductos:Producto={
    id:this.db.getId(),
    nombre:'',
    precioNormal:0,
    precioReducido:0,
    foto:'',
    fecha:new Date,
    stock:0

  }
  newImage='';

  newFile:any;

  constructor(private authService: AuthService,
    private interaction:InteractionsService,
    private db:FirebaseServiceService,
    private fb: FormBuilder,
    public sv:StorageService


    ) {
          }
  ngOnInit() {
    this.getProductos();
  }

  async guardar_producto() {
    const path = 'producto'; // Ruta de la colección en la base de datos.
    try{
    const idu =  await this.authService.getUid();
    const id= this.db.getId();
    const name= this.newProductos.nombre;
    if(idu){
      this.newProductos.id=idu;
      const res=await this.sv.uploadImage(this.newFile,path,name);
      this.newProductos.foto=res;
      if(this.newFile!=undefined){

        this.db.create(this.newProductos,path,id).then(()=>{
          this.interaction.presentToast("PRODUCTO GUARDADO CON EXITO");
        });
      }

    }
    else{
      console.log("Producto no agregado")
    }


    }
    catch(error){}
  }

  getProductos(){
    const path='producto'

    this.db.getCollection<Producto>(path).subscribe(res=>{
      this.listaP=res
    });
  }

  deleteProducto(producto:Producto){
    const path="producto"
    this.db.delete(path,this.newProductos.id)
    console.log("Producto Eliminado")


  }

  nuevo(){
    this.activo=true
    this.newProductos={
      id:this.db.getId(),
      nombre:'',
      precioNormal:0,
      precioReducido:0,
      foto:'',
      fecha:new Date,
      stock:0

    }

  }



  newImagenLoad(event:any){
    if(event.target.files&& event.target.files[0]){
      this.newFile=event.target.files[0];
      const reader= new FileReader();
      reader.onload=((image=>{
        this.newProductos.foto=image.target?.result as string;
      }));
      reader.readAsDataURL(event.target.files[0]);
    }

  }

}
