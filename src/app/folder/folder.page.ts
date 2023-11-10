import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);

  login:boolean=false

  constructor(private auth: AuthService) {
    auth.getUserAuthState().subscribe(user => {
      if (user) {
        // El usuario está autenticado
        console.log('Usuario autenticado', user);
        this.login=true;
        
      } else {
        // El usuario no está autenticado
        console.log('Usuario no autenticado');
        this.login=false
      }
    })
  }
  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }
 

}
