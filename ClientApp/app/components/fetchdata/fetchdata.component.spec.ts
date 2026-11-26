import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { FetchDataComponent } from './fetchdata.component';

const api = '/api/SampleData/WeatherForecasts';

describe('FetchDataComponent', () => {
  let fixture: ComponentFixture<FetchDataComponent>;
  let http: HttpTestingController;
  let root: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    fixture = TestBed.createComponent(FetchDataComponent);
    http = TestBed.inject(HttpTestingController);
    root = fixture.nativeElement;
    fixture.detectChanges();
  });

  afterEach(() => http.verify());

  it('announces loading, then renders the forecast returned by the API', () => {
    expect(root.querySelector('[role="status"]')?.textContent).toContain('Loading forecasts');
    expect(root.querySelector('button')?.disabled).toBe(true);

    http.expectOne({ method: 'GET', url: api }).flush([
      { dateFormatted: '2026-11-27', temperatureC: 10, temperatureF: 50, summary: 'Cool' },
    ]);
    fixture.detectChanges();

    expect(root.querySelector('caption')?.textContent).toBe('Sample weather forecasts');
    expect(root.querySelector('tbody th')?.textContent).toBe('2026-11-27');
    expect(root.querySelector('tbody tr')?.textContent).toContain('Cool');
    expect(root.querySelector('button')?.disabled).toBe(false);
  });

  it('allows retry after a failed request', () => {
    http.expectOne(api).flush(null, { status: 503, statusText: 'Unavailable' });
    fixture.detectChanges();

    expect(root.querySelector('[role="alert"]')?.textContent).toContain('could not be loaded');
    expect(root.querySelector('button')?.textContent).toContain('Retry forecasts');

    root.querySelector('button')!.click();
    http.expectOne(api).flush([
      { dateFormatted: '2026-11-27', temperatureC: 10, temperatureF: 50, summary: 'Cool' },
    ]);
    fixture.detectChanges();

    expect(root.querySelector('[role="alert"]')).toBeNull();
    expect(root.querySelectorAll('tbody tr')).toHaveLength(1);
  });

  it('reports empty results without rendering an empty table', () => {
    http.expectOne(api).flush([]);
    fixture.detectChanges();

    expect(root.querySelector('[role="status"]')?.textContent).toContain('No forecasts are available');
    expect(root.querySelector('table')).toBeNull();
  });

  it('cancels an outstanding request when the page is left', () => {
    const request = http.expectOne(api);
    fixture.destroy();

    expect(request.cancelled).toBe(true);
  });
});
