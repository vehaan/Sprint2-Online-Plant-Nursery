import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MustMatch } from '../forgot-password/forgot-password.component';
import { AuthenticationService } from '../service/authentication.service';

export class JwtResponse {

  jwtToken!: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  invalidLogin = false
  loginForm!: FormGroup;
  submitted = false;
  errMsg: string = 'Invalid Credentials';

  constructor(private router: Router,
    private loginservice: AuthenticationService, private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],

    });

  }


  get f() { return this.loginForm.controls; }

  checkLogin() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    (this.loginservice.authenticate(this.loginForm.value.email, this.loginForm.value.password).subscribe(
      data => {
        console.log(data)

        this.router.navigate(['welcome'])

        this.invalidLogin = false
      },
      error => {
        this.invalidLogin = true



      }
    )
    );

  }




}