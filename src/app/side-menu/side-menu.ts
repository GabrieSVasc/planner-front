import { Component } from '@angular/core';
import { User } from '../user';
import { UserService } from '../services/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  imports: [],
  templateUrl: './side-menu.html',
  styleUrl: './side-menu.css',
})
export class SideMenu {
  constructor(
    private userService: UserService,
    private router: Router
  ){};
  
  nome = "Default";
  inicial = this.nome[0];

  ngOnInit(){
  }
  goTo(rota: String){
    this.router.navigate(["/"+rota]);
  }
  click(){
    this.userService.logout();
    this.router.navigate(["/login"]);
  }
}
