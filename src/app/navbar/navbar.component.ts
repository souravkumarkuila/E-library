import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  notifications: number = 0;

 
  // showNotification() {
  //   // Implement your notification logic here
  //   this.notifications += 1;
  //   alert(`You have ${this.notifications} new notifications!`);
  // }
  openProfile() {
    alert('Opening profile...');
  }

  logout(){
    sessionStorage.clear();
   
  }

}
