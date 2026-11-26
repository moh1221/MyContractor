import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { describe, expect, it } from 'vitest';
import { routes } from '../../app.routes';
import { AppComponent } from './app.component';

describe('MyContractor routing', () => {
  it('renders navigation and marks the current page for assistive technology', async () => {
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    await TestBed.inject(Router).navigateByUrl('/counter');
    await fixture.whenStable();

    const root: HTMLElement = fixture.nativeElement;
    expect(root.querySelector('main h1')?.textContent).toBe('Counter');
    expect(root.querySelector('nav a[aria-current="page"]')?.textContent).toBe('Counter');
  });
});
