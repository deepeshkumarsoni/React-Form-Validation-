import { HttpClient } from '@angular/common/http';
import { AsyncValidator, AsyncValidatorFn, ValidationErrors, FormControl, ControlContainer } from '@angular/forms';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

export function existingEmailValidation(httpClient:HttpClient):AsyncValidatorFn{
    const validationErrors : ValidationErrors = {
        emailExist : true
    };
    
    function checkEmailExist(control:FormControl){
        const email =  control.value;
        return httpClient.get(`http://localhost:3000/users?email=${email}`).
        pipe(map((user:any[])=>user.length>0),
        map((isUserExist)=>(isUserExist ? {emailExist:true}:
            null))
        );
    }
    return checkEmailExist;
   
}
