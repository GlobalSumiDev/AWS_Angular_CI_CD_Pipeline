import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @ViewChild("firstNameField")firstNameField:any;
constructor(){
  
}
focusOnFirstName(){
  this.firstNameField.nativeElement.focus();
}

}
