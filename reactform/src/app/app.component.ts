import { Component,OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, MinLengthValidator } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  user : FormGroup;
  constructor(){}

  ngOnInit(): void {   
    this.user = new FormGroup({
      name : new FormControl("",[Validators.required,Validators.minLength(3)]),
      surname : new FormControl("",Validators.minLength(3)),
      email : new FormControl("",Validators.email),
    });   
  }

  get isNameInvalid(){
    return this.user.touched && !(this.user.controls['name'].errors === null);
  }

  get isSurnameInvalid(){
    return this.user.touched && !(this.user.controls['surname'].errors === null);
  }

  get isEmailInvalid(){
    return this.user.touched && !(this.user.controls['email'].errors === null);
  }

  get surnameValidationMessage(){
    
    const xyz = this.user.controls['surname'].errors;
    if(xyz['minlength']){
      return `Name should be minimum of ${xyz['minlength'].requiredLength}characters `;
    }
  }

  get nameValidationMessage(){

    const abc  = this.user.controls['name'].errors;
    if(abc['required']){
      return "Name is required";
    }

    if(abc['minlength']){
     // const xyz = abc['minlength'];
      return `Name should be minimum of ${abc['minlength'].requiredLength}characters `;
    }
  }

}
