import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import Mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
 
Mapboxgl.accessToken = 'pk.eyJ1IjoiZG9uZ3JhZmZ0aCIsImEiOiJjbDdoc2l5M3YwaDlxM3Zwb3VxbzBhNmg5In0.Jbjk3-7RSgPm5BRDK08kzQ';

if( !navigator.geolocation){
  alert('Navegador no soporta la geolocalizacion');
  throw new Error('Navegador no soporta la geolocalizacion');
}

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
