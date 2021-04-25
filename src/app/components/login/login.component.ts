import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/Auth/authentication.service';

export class JwtResponse{

  jwtToken!: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = ''
  password = ''
  invalidLogin = false
  response!:JwtResponse

  constructor(private router: Router,
    private loginservice: AuthenticationService) { }

  ngOnInit() {
    
  }

  checkLogin() {
    (this.loginservice.authenticate(this.email, this.password).subscribe(
      data => {
        console.log(data)
        /* this.response=data.jwtToken;
        console.log("Rseponse" ,this.response,"response ") */
        //this.setValues(data);
       this.router.navigate(['welcome'])
        this.invalidLogin = false
      },
      error => {
        this.invalidLogin = true

      }
    )
    );

  }

  setValues(data:any){
    console.log("in set values",data)
    sessionStorage.setItem('email',this.email);
        sessionStorage.setItem('token',data.token)

      console.log('data set')



  }
}