import { Component,OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
      firstName : new FormControl("",[Validators.minLength(3),Validators.required]),
      lastName : new FormControl("",[Validators.minLength(3)]),
      emailId : new FormControl("",Validators.email)
    });
  }

  get isFirstNameInvalid(){
    return this.user.touched && !(this.user.controls['firstName'].errors===null);
  }

  get isLastNameInvalid(){
    return this.user.touched && !(this.user.controls['lastName'].errors===null);
  }

  get isEmailInvalid(){
    return this.user.touched && !(this.user.controls['email'].errors===null);
  }


  get firstNameValidationMessage(){
    const errors = this.user.controls['firstName'].errors;
    
    if(errors['required']){
      return "First Name Required";
    }
    if(errors['minlength']){
      const minLengthError = errors['minlength'];
      return `First Name should be minimum of ${minLengthError.requiredLength}character`;
    }
  }
  get lastNameValidationMessage(){
    const errors = this.user.controls['lastName'].errors;
       
    if(errors['minlength']){
      const minLengthError = errors['minlength'];
      return `Last Name should be minimum of ${minLengthError.requiredLength}character`;
    }
  }
}
