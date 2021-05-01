import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Seed } from './Seed';
import { SeedService } from '../../../services/seed.service';
@Component({
  selector: 'app-seed',
  templateUrl: './seed.component.html',
  styleUrls: ['./seed.component.css'],
})
export class SeedComponent implements OnInit {
  seed!: Seed;
  sub!: any;
  id: number = 0;
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _router: Router,
    private _service: SeedService
  ) {}
  ngOnInit(): void {
    this.id = Number(this._ActivatedRoute.snapshot.paramMap.get('id'));
    console.log(this.id + ' ' + this._ActivatedRoute);
    this._service.getSeedById(this.id).subscribe(
      (data) => {
        console.log(data);
        this.seed = data;
      },
      (err) => console.log(err)
    );
  }
  onBack(): void {
    this._router.navigate(['seeds']);
  }
}
