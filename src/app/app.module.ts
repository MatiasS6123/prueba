import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

// Importaciones relacionadas con AngularFire

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { firebaseConfig } from '../environments/environment';
import { ProtegeVistaGuard } from '../app/guard/protege-vista.guard';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

@NgModule({
  declarations: [
    AppComponent,
    // ... otros componentes
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,

    // Inicialización de AngularFire y módulos relacionados
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireStorageModule,
  ],
  providers: [
    ProtegeVistaGuard, // Agrega tu guardia a la lista de providers.
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
