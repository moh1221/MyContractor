import { Component, Inject } from '@angular/core';
import { WeatherForecast } from './WeatherForecast';

@Component({
    selector: 'fetchdata',
    templateUrl: './fetchdata.component.html'
})
export class FetchDataComponent {
    public forecasts: WeatherForecast[];
}


