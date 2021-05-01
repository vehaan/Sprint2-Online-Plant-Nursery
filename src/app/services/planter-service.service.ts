import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPlanter } from '../components/planters/planter/IPlanter';

@Injectable({
  providedIn: 'root',
})
export class PlanterServiceService {
  private error!: string;

  public baseUrl: string =
    'http://localhost:9191/onlineplantnursery/products/admin';

  constructor(private http: HttpClient) {}

  getAllPlanters(): Observable<IPlanter[]> {
    return <Observable<IPlanter[]>>this.http.get(this.baseUrl + '/planters');
  }

  getPlanterById(id: number): Observable<IPlanter> {
    console.log('in service class');
    return <Observable<IPlanter>>(
      this.http.get(this.baseUrl + '/planter/id/' + id)
    );
  }

  updatePlanter(planter: IPlanter): Observable<IPlanter> {
    return <Observable<IPlanter>>(
      this.http.put(this.baseUrl + '/planter', planter)
    );
  }

  deletePlanter(planter: IPlanter) {
    return this.http.delete<IPlanter>(
      this.baseUrl + '/deletePlanter/id/' + planter.id
    );
  }

  public createPlanter(planter: IPlanter) {
    return this.http.post<IPlanter>(this.baseUrl + '/planter', planter);
  }

  costLowToHigh(): Observable<IPlanter[]> {
    return <Observable<IPlanter[]>>(
      this.http.get(this.baseUrl + '/planters/costLowToHigh')
    );
  }
  costHighToLow(): Observable<IPlanter[]> {
    return <Observable<IPlanter[]>>(
      this.http.get(this.baseUrl + '/planters/costHighToLow')
    );
  }
}
