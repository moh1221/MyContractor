import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherForecast } from './WeatherForecast';

@Injectable({ providedIn: 'root' })
export class FetchDataService {
  private readonly http = inject(HttpClient);

  getForecast(): Observable<WeatherForecast[]> {
    return this.http.get<WeatherForecast[]>('/api/SampleData/WeatherForecasts');
  }
}
