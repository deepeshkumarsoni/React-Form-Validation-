import { Component,OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, MinLengthValidator } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { existingEmailValidation} from './unique-email-validaator';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  user : FormGroup;
  constructor(private httpClient : HttpClient){}

  ngOnInit(): void {   

    this.httpClient.get('http://localhost:3000/users/3').
    subscribe((user)=>{
      this.user.patchValue(user);
    });

    this.user = new FormGroup({
      name : new FormControl("",[Validators.required,Validators.minLength(3)]),
      surname : new FormControl("",Validators.minLength(3)),
      email : new FormControl("",Validators.email,existingEmailValidation(this.httpClient)),
    });   
  } 

  get isFormInvalid(){
    return !this.user.valid;
  }

  submitUser(){
    const user = {
      user :this.user.value,
      id : Date.now().toPrecision()
    };  
    this.httpClient.post("http://localhost:3000/users",user).
    subscribe((user)=>{
      this.user.reset();
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

  get emailInvalidMessage(){ 
    const abc  = this.user.controls['email'].errors;
    if(abc['email']){
      return "Enter Valid Email-Id";
    }

    if(abc['emailExist']){
     // const xyz = abc['minlength'];
      return `This Email-Id is already Exist.
      Enter new Email-Id `;
    }
  }

  get emailValidMessage(){
    const abc = this.user.controls['email'].errors;
    if(abc === null){
      return 'This Email is Available';
    }
  }

}
