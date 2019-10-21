import { Component, OnInit } from '@angular/core';
import { PlaceModel } from './models/place.model';
import { PlacesService } from '../services/places.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private loading = true;
  private places: PlaceModel[] = [];
  private sub$: Subscription;
  constructor(
    private placesService: PlacesService,
  ) { }

  ngOnInit() {
    this.getPlaces();
  }

  ngOnDestroy() {
    if (this.sub$) {
      this.sub$.unsubscribe();
    }
  }

  async getPlaces() {
    this.loading = true;
    this.places = await this.placesService.getPlaces();
    this.sub$ = this.placesService.getVotes().subscribe(
      (data) => {
        let place = this.places.find((p) => p.id == data.placeId);
        if (place) {
          place.numberOfVotes++;
        }
      }
    )
    this.loading = false;
  }

  vote(placeId: number, index: number) {
    this.placesService.sendVote(placeId);
    this.places[index].numberOfVotes++;
  }
}
