import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { WeatherForecast } from './WeatherForecast';


@Injectable()
export class FetchDataService {

    _baseUrl: string;

    constructor(
        private http: Http, 
        @Inject('BASE_URL') baseUrl: string
    ) {
        this._baseUrl = baseUrl;
    }

    getForecast(): Promise<WeatherForecast[]> {
        return this.http.get(this._baseUrl + 'api/SampleData/WeatherForecasts')
        .toPromise()
        .then(response => response.json() as WeatherForecast[])
        .catch(this.handleError);;
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
      }
}