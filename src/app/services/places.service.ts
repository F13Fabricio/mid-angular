import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PlaceModel } from '../home/models/place.model';
import { environment } from 'src/environments/environment';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  constructor(
    private http: HttpClient,
    private socket: Socket,
  ) { }

  public async getPlaces() {
    const url = environment.backendUrl + '/places';
    let result = await this.http.get<any>(url).toPromise();
    return result.data;
  }

  public sendVote(placeId: number){
    this.socket.emit("votation", { placeId });
  }
 public getVotes() {
    return this.socket.fromEvent<any>("votation");
  }
}
