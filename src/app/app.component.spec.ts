import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { IsbnService } from './services/isbn.service';

describe('AppComponent', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers:[IsbnService]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should disable button when isbn is empty', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    app.isbnValue = '';
   
    fixture.detectChanges();
    const btn = fixture.debugElement.nativeElement.querySelector('.roundedButton');
    expect(btn.disabled).toBeTruthy();
  });

  it('should enable button when isbn is not empty', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    app.isbnValue = '1234567891';
   
    fixture.detectChanges();
    const btn = fixture.debugElement.nativeElement.querySelector('.roundedButton');
    expect(btn.disabled).toBeFalsy();
  });

  it('should return true for valid ISBN with all digits', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    app.isbnValue = '3-598-21508-8';
    let result=app.validate();
    
    expect(result).toBeTruthy();
  });

  it('should return true for valid ISBN with digits and X', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    app.isbnValue = '3-598-21507-X';
    let result=app.validate();
    
    expect(result).toBeTruthy();
  });

  it('should return false for in valid characters', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    app.isbnValue = '3-ABC-21507-X';
    let result=app.validate();
    
    expect(result).toBeFalsy();
  });

  it('generateNewISBN method should generate valid ISBN-13 for a valid ISBN10', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    app.isbnValue = '3-598-21507-X';

    let result=app.generateNewISBN();
    
    expect(result.length).toBe(13);
  });

  it('generateNewISBN should return empty for an invalid ISBN10', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    app.isbnValue = '3-aaa-21507-X';

    let result=app.generateNewISBN();
    
    expect(result.length).toBe(0);
  });
});
