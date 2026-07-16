import { Component } from '@angular/core';
import { User } from '../user';
import { UserService } from '../services/user';

@Component({
  selector: 'app-side-menu',
  imports: [],
  templateUrl: './side-menu.html',
  styleUrl: './side-menu.css',
})
export class SideMenu {
  constructor(private userService: UserService){};
  
  nome = "Default";
  inicial = this.nome[0];

  ngOnInit(){
  }

  click(){
    this.userService.logout();
  }
}
