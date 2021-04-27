import { HttpClient } from '@angular/common/http';
import { ApplicationRef, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Seed } from '../components/seeds/seed/Seed';

@Injectable({
    providedIn:'root'
})

export class SeedService {

    public baseUrl: string = "http://localhost:9191/onlineplantnursery/products"
    constructor(private http: HttpClient){}
    
    getAllSeeds(): Observable<Seed[]>{
        return <Observable<Seed[]>>this.http.get(this.baseUrl + "/admin/seeds")
    }

    FilterByBloomTime(bloomTime:string) {
        return <Observable<Seed[]>>this.http.get(this.baseUrl+"/admin/seeds/filterbybloomtime/"+bloomTime)
    }
    FilterByDifficulty(difficulty:string) {
        return <Observable<Seed[]>>this.http.get(this.baseUrl+"/admin/seeds/filterbydifficulty/"+difficulty)
    }

    getSeedById(id: number): Observable<Seed> {
        console.log("in service class")
        return <Observable<Seed>>this.http.get(this.baseUrl + "/admin/seeds/id/" + id);
    }

    deleteSeedById(id: number): Observable<Seed> {
        console.log("in service class")
        return <Observable<Seed>>this.http.delete(this.baseUrl + "/admin/seeds/id/" + id);
    }

    updateSeed(seed: Seed): Observable<Seed> {
        return <Observable<Seed>>this.http.put(this.baseUrl + "/admin/seeds", seed);
    }
    
    addSeed(seed: Seed): Observable<Seed> {
        return <Observable<Seed>>this.http.post(this.baseUrl + "/admin/seed", seed);
    }

    getAllSeedsLowToHigh(): Observable<Seed[]> {
        return <Observable<Seed[]>>this.http.get(this.baseUrl + "/admin/seeds/costLowToHigh");
    }

    getAllSeedsHighToLow(): Observable<Seed[]>{
        return <Observable<Seed[]>>this.http.get(this.baseUrl + "/admin/seeds/costHighToLow");
    }
}