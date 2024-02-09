import { Component } from '@angular/core';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent {
  sub=false;
  isPopupOpen: boolean = false;
  emailAddress: string = '';

  displayStyle = "none";
  
  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }

  submitForm() {
    const email = (<HTMLInputElement>document.getElementById('emailInput')).value;
    alert('Thank you for your recommendation!');
    this.closePopup();
  }
}

