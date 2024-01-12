import { Component } from '@angular/core';
import { IsbnService } from './services/isbn.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isbnValue!:string;

  constructor(private isbnService:IsbnService) {

  }

  validate(): boolean {
    const result = this.isbnService.isValid(this.isbnValue);
    if(result){
      alert("Entered input is a Valid ISBN");
    }
    else {
      alert("Entered input is Not a Valid ISBN");
    }

    return result;
  } 

  generateNewISBN():string {
    const result = this.isbnService.isValid(this.isbnValue);

    if(result){
      let isbn13 = this.isbnService.generate13DigitISBN(this.isbnValue);
      alert("Valid ISBN-13 -"+ isbn13);
     return isbn13;

    }else {
      alert("Entered input is Not a Valid ISBN");
      return '';
    }
  }
}
