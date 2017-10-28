import { Injectable } from '@angular/core'
import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { WeatherForecast } from './WeatherForecast';


@Injectable()
export class FetchDataComponent {
    public forecasts: WeatherForecast[];

    constructor(http: Http, @Inject('BASE_URL') baseUrl: string) {
        http.get(baseUrl + 'api/SampleData/WeatherForecasts').subscribe(result => {
            this.forecasts = result.json() as WeatherForecast[];
        }, error => console.error(error));
    }
}