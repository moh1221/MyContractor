import { Component, Inject, OnInit } from '@angular/core';
import { WeatherForecast } from './WeatherForecast';
import { FetchDataService } from './fetchdata.service'

@Component({
    selector: 'fetchdata',
    templateUrl: './fetchdata.component.html'
})
export class FetchDataComponent implements OnInit {
    public forecasts: WeatherForecast[];
    
    constructor(private fetchDataService: FetchDataService) {
    }

    ngOnInit(): void {
        this.getForecast();
      }

    getForecast(): void {
        this.fetchDataService.getForecast().then(respond =>  this.forecasts = respond)
    }

}


