import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, forkJoin, Observable, Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/services/Auth/authentication.service';
import { CustomerService } from 'src/app/services/customer.service';
import { PlantService } from 'src/app/services/plant.service';
import { PlanterServiceService } from 'src/app/services/planter-service.service';
import { SeedService } from 'src/app/services/seed.service';
import { Customer } from '../customers/view-customer/customer';
import { IPlanter } from '../planters/planter/IPlanter';
import { Plant } from '../plants/plant/Plant';
import { Seed } from '../seeds/seed/Seed';
import { IProduct } from './IProduct'


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  // products !:IProduct[];
  error !: string;
  planters !: IPlanter[];
  plants !: Plant[];
  seeds !: Seed[];
  customer!:Customer;
  id!: number;
  email!: any;

  constructor(public loginService:AuthenticationService,private service:CustomerService, private router:Router, private planterService: PlanterServiceService, private plantService: PlantService, private seedService: SeedService ){ }
  ngOnInit() {
      
    


    let sub1 = this.planterService.getAllPlanters();

    let sub2 = this.plantService.getAllPlants();

    let sub3 = this.seedService.getAllSeeds();

    combineLatest([sub1, sub2, sub3]).subscribe(response => {
      // response[0] will be req1 response
      // response[1] will be req2 response
      this.planters = response[0];
      this.plants = response[1];
      this.seeds = response[2];
      this.shuffle(this.planters);
      this.shuffle(this.plants);
      this.shuffle(this.seeds);
     })

     this.email= sessionStorage.getItem('email')
    this.service.getCustomerByMail(this.email).subscribe(
      (data)=> {console.log(data);
          this.customer=data},
      (err)=>console.log(err))
 
     this.checkStatus(this.customer.status);

  
  }

  // ngAfterViewChecked(): void {
  //   this.customer=this.loginService.customer;
  //   this.checkStatus(this.customer.status);
  //   console.log(this.customer)
  // }

  
  checkStatus(status:string){

    if(status == 'BLOCK'){
      alert("Your account is blocked for 10 days");
      this.router.navigate(['/logout']);
    }

  }

  addPlanter() {
    this.router.navigate(['add-planter'])
  }

  shuffle(array:any) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }



}

