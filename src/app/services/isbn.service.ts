import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class IsbnService {

    isValid(isbn: string): boolean {
        // TODO replace this block with your logic
        
        const isbnRegex = /^(?:\d{9}[\dXx])$/;
        let input = isbn;
        input = input.replace(/-/g, '');

        if(isbnRegex.test(input)){
          return this.checkISBNLogic(input);
        }

        return false;
    }

    checkISBNLogic(input:string):boolean {
        let charArr = Array.from(input);
        let i=0;
        let sum = 0;

        charArr.forEach(element => {
            let item =isNaN(parseInt(element)) ? 10 :parseInt(element);

            sum = sum + ( item * (10-i)); 
            i++;
        });

        return (sum % 11 == 0); 
    }

    /* Multiply each of the first 12 digits by 1 or 3, alternating as you move from left to right, 
    and sum the results. Divide the sum by 10. Subtract the remainder (not the quotient) from 10 
    Input should be valid ISBN-10*/
    generate13DigitISBN(input:string):string {
        input = input.replace(/-/g, '');
        
        let isbn13='';
        let prefix="978";

        const isbn13WithoutCheckDigit = prefix + input.substring(0, 9);

            // Calculate the check digit for ISBN-13
            let sum = 0;
            for (let i = 0; i < 12; i++) {
                const digit = parseInt(isbn13WithoutCheckDigit[i]);
                sum += i % 2 === 0 ? digit : digit * 3;
            }
            const checkDigit = (10 - (sum % 10)) % 10;

            // Construct the full ISBN-13
            isbn13 = isbn13WithoutCheckDigit + checkDigit;

            return isbn13;
    }
}

