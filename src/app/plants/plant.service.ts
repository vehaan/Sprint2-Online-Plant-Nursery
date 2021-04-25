import { HttpClient } from '@angular/common/http';
import { ApplicationRef, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Plant } from './Plant'
@Injectable({
    providedIn: 'root'
})
export class PlantService {
    public baseUrl: string = "http://localhost:9191/onlineplantnursery/products"
    constructor(private http: HttpClient) { }
    getAllPlants(): Observable<Plant[]> {
        return <Observable<Plant[]>>this.http.get(this.baseUrl + "/admin/plants")
    }
    getPlantById(id: number): Observable<Plant> {
        console.log("in service class")
        return <Observable<Plant>>this.http.get(this.baseUrl + "/admin/plant/id/" + id);
    }
    deletePlantById(id: number): Observable<Plant> {
        console.log("in service class")
        return <Observable<Plant>>this.http.delete(this.baseUrl + "/admin/plant/id/" + id);
    }
    updatePlant(plant: Plant): Observable<Plant> {
        return <Observable<Plant>>this.http.put(this.baseUrl + "/admin/plant/id/"+plant.id, plant);
    }
    addPlant(plant: Plant): Observable<Plant> {
        return <Observable<Plant>>this.http.post(this.baseUrl + "/admin/plant", plant);
    }
    costLowToHigh():Observable<Plant[]>{
        return <Observable<Plant[]>>this.http.get(this.baseUrl+"/admin/plants/costLowToHigh");
    }
    costHighToLow():Observable<Plant[]>{
        return <Observable<Plant[]>>this.http.get(this.baseUrl+"/admin/plants/costHighToLow");
    }
    FilterByDifficulty(difficulty:string):Observable<Plant[]>{
        return <Observable<Plant[]>>this.http.get(this.baseUrl+"/admin/plants/filterByDifficulty/"+difficulty)
    }
    FilterByBloomTime(bloomTime:string):Observable<Plant[]>{
        return <Observable<Plant[]>>this.http.get(this.baseUrl+"/admin/plants/filterByBloomTime/"+bloomTime)
    }
}
