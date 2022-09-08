import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  private debounceTimer?: NodeJS.Timeout;

  constructor() { }

  ngOnInit(): void {
  }

  onQueryChanged(query: string){
    //Se limpia el debounceTimer
    if(this.debounceTimer) clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(()=>{
      console.log(query);
      
    },500);

  }
}
