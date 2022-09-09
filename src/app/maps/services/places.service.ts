import { Injectable } from '@angular/core';
import { Feature, PlacesResponse } from '../interfaces/places';
import { PlacesApiClient } from '../api';
import { MapService } from './map.service';


@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public useLocation?: [number,number];
  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];

  get isUserLocationReady(): boolean{
    return !!this.useLocation;
  }

//  constructor(private http:HttpClient) { 
  constructor(private placesApi: PlacesApiClient,
    private mapService: MapService) { 
    this.getUserLocation();
  }

  getUserLocation(): Promise<[number,number]>{
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({coords})=> 
        {
          this.useLocation = [coords.longitude, coords.latitude];
          resolve(this.useLocation);
        },    
        (err) => {
          alert('No se pudo obtener la geolocalizacion')
          reject();          
        }
      );
    });
  }  

  getPlaceByQuery( query: string){
    //TODO : evaluar cuando el query es null

    if ( query.length === 0 ) {
      this.isLoadingPlaces = false;
      this.places = [];
      return;
    }

    if( !this.useLocation ) throw Error('No hay userLocation');
    this.isLoadingPlaces = true;
    this.placesApi.get<PlacesResponse>(`/${query}.json`,{
      params: {
        proximity: this.useLocation.join(',')
      }
    })
    .subscribe(res => {
      //Nuevos lugares
      this.isLoadingPlaces = false;
      this.places = res.features;
      this.mapService.createMarkersFromPLaces(this.places, this.useLocation!);
    });
  }

  deletePlaces() {
    this.places = [];
  }

}
