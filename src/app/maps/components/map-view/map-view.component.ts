import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Map , Popup, Marker} from 'mapbox-gl';
import { PlacesService } from '../../services/places.service';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements AfterViewInit {

  @ViewChild('mapDiv')
  mapDivElement!: ElementRef

  constructor(private placesService: PlacesService) { }

  

  ngAfterViewInit(): void {    

    if(!this.placesService.useLocation) throw Error('No hay placesService.userLocation');
    console.log(this.placesService.useLocation);
    const map = new Map({
      container: this.mapDivElement.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: this.placesService.useLocation,  // starting position [lng, lat]
      zoom: 14 // starting zoom
      });

    const popup = new Popup().setHTML(`
      <h6>Aqui estoy</h6>
      <span>Estoy en este lugar del mundo</span>
    `);


    new Marker({color: 'red'}).setLngLat(this.placesService.useLocation).setPopup(popup).addTo(map);
  }

}
