import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  order!: Order;
  sub!: any;
  id: number = 0;

  constructor(private _ActivatedRoute: ActivatedRoute, private _router: Router, private _service: OrderService) { }

  ngOnInit(): void {
    // this.id = Number(this._ActivatedRoute.snapshot.paramMap.get("id"));
    // console.log(this.id + " " + this._ActivatedRoute)
    // this._service.getOrderById(this.id).subscribe(
    //   (data) => { console.log(data); this.order = data },
    //   (err) => console.log(err)
    // );
  }

  onSubmit(): void{
    
  }
  // onBack(): void {
  //   this._router.navigate(['/orders'])
  // }
}
