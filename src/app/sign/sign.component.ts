import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { User } from '../common/user';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss']
})
export class SignComponent implements OnInit {

  isLinear = false;
  signUpFormGroup: FormGroup;
  signInFormGroup: FormGroup;
  user: User;
  isValidUser: boolean;
  messageUserExists: string = '';

  
  constructor(private _formBuilder: FormBuilder,private userService:UserServiceService) { }

  ngOnInit(): void {

    this.signUpFormGroup = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['',Validators.required],
    });
    this.signInFormGroup = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['',Validators.required]
    });

  }

  get username(){
    return this.signUpFormGroup.get('username');
  }

  get password() {
    return this.signUpFormGroup.get('password');
  }
  
  get email() {
    return this.signUpFormGroup.get('email');
  }

  get username_signin() {
    return this.signInFormGroup.get('username');
  }

  get password_signin() {
    return this.signInFormGroup.get('password');
  }


  signUp(signUpFormGroup:FormGroup) {
    console.log("profile form value::",signUpFormGroup.value);
    const newUser = new User(1,signUpFormGroup.get('username').value,signUpFormGroup.get('password').value,signUpFormGroup.get('email').value);
    this.userService.registerUser(newUser).subscribe(
      (data) => {
        this.user = data;
        this.isValidUser = (this.user!==null);
        if (!this.isValidUser) {
          this.messageUserExists = "User deja existant !";
        }
        console.log("value of idValiduser is::", this.isValidUser);  
      }
    );
  }

  signIn(signInFormGroup:FormGroup) {
    console.log("value sign In is::",signInFormGroup.value);
    
  }
}
