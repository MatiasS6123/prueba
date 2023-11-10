import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ProtegeVistaGuard } from '../app/guard/protege-vista.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  },

  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)


  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./usuario/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path:'reset/password',
    loadChildren:()=> import('./login/reset-password/reset-password.module').then(m=> m.ResetPasswordPageModule)
  }
  ,
  {
    path: 'crud-productos',
    loadChildren: () => import('./tienda/crud-productos/crud-productos.module').then( m => m.CrudProductosPageModule)
  },
  {
    path: 'tienda',
    loadChildren: () => import('./tienda/tienda/tienda.module').then( m => m.TiendaPageModule)
  },
  {
    path: 'google-maps',
    loadChildren: () => import('./google-maps/google-maps.module').then( m => m.GoogleMapsPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
