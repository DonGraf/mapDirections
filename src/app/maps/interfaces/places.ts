export interface PlacesResponse {
  type:        string;
  query:       string[];
  features:    Feature[];
  attribution: string;
}

export interface Feature {
  id:          string;
  type:        string;
  placeType:   string[];
  relevance:   number;
  properties:  Properties;
  text_es:      string;
  placeNameEs: string;
  text:        string;
  place_name:   string;
  center:      number[];
  geometry:    Geometry;
  context:     Context[];
}

export interface Context {
  id:          string;
  textEs:      string;
  text:        string;
  wikidata?:   string;
  languageEs?: string;
  language?:   string;
  shortCode?:  string;
}

export interface Geometry {
  type:        string;
  coordinates: number[];
}

export interface Properties {
  accuracy: string;
}
