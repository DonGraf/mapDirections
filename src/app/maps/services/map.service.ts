import { IfStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { LngLatLike, Map } from 'mapbox-gl';
import { ignoreElements } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map!: Map;

  get isMapReady(){
    return !!this.map;
  }

  //Asigno el mapa
  setMap(map: Map){
    this.map = map;
  }

  //Moverse a otro lugar
  flyTo(coords: LngLatLike){
    if(!this.isMapReady) throw Error('El mapa no esta inicializado');
    // Se viaja a la direccion
    this.map?.flyTo({
      zoom: 14,
      center: coords
    });
  }

  constructor() { }
  
}
