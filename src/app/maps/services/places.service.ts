import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Feature, PlacesResponse } from '../interfaces/places';

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

  constructor(private http:HttpClient) { 
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
    this.isLoadingPlaces = true;
    this.http.get<PlacesResponse>(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?country=cl&types=place%2Cpostcode%2Caddress&language=es&access_token=pk.eyJ1IjoiZG9uZ3JhZmZ0aCIsImEiOiJjbDdoc2l5M3YwaDlxM3Zwb3VxbzBhNmg5In0.Jbjk3-7RSgPm5BRDK08kzQ`)
    .subscribe(res => {
        console.log(res.features);
      this.isLoadingPlaces = false;
      this.places = res.features;
    });
  }

}
