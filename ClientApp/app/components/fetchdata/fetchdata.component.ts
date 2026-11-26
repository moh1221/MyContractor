import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { WeatherForecast } from './WeatherForecast';
import { FetchDataService } from './fetchdata.service';

type WeatherState =
  | { kind: 'loading' }
  | { kind: 'error' }
  | { kind: 'loaded'; forecasts: WeatherForecast[] };

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetchdata.component.html',
  styleUrl: './fetchdata.component.css',
})
export class FetchDataComponent implements OnInit {
  private readonly service = inject(FetchDataService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly state = signal<WeatherState>({ kind: 'loading' });
  readonly weather = this.state.asReadonly();

  ngOnInit(): void {
    this.loadForecasts();
  }

  loadForecasts(): void {
    this.state.set({ kind: 'loading' });
    this.service.getForecast().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (forecasts) => this.state.set({ kind: 'loaded', forecasts }),
      error: () => this.state.set({ kind: 'error' }),
    });
  }
}
