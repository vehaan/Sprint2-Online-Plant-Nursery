import { Component, OnInit } from '@angular/core';
import { PlantService } from './plant.service';
import { Plant } from './Plant'
import { Router } from '@angular/router';
@Component({
  selector: 'app-plant-list',
  templateUrl: './plant-list.component.html',
  styleUrls: ['./plant-list.component.css']
})
export class PlantListComponent implements OnInit {
  public plants!: Plant[]
  private error!: string
  private id: number = 0;
  constructor(private service: PlantService, private router: Router) { }
  ngOnInit(): void {
    this.service.getAllPlants().subscribe(
      (data) => this.plants = data,
      (err) => this.error = err
    )
  }
  onEdit(plant: Plant) { this.router.navigate(['edit-plant', plant.id]) }
  onDelete(plant: Plant): void {
    this.service.deletePlantById(plant.id)
      .subscribe(data => {
        console.log("user deleted")
        this.plants = this.plants.filter(u => u !== plant);
      })
  };
  addPlant() {
    this.router.navigate(['add-plant'])
  }
}
