import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { CounterComponent } from './counter.component';

describe('CounterComponent', () => {
  let fixture: ComponentFixture<CounterComponent>;
  let root: HTMLElement;

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterComponent);
    root = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('displays the title and an initial count of zero', () => {
    expect(root.querySelector('h1')?.textContent).toBe('Counter');
    expect(root.querySelector('[role="status"] strong')?.textContent).toBe('0');
  });

  it('increments once for each button click', () => {
    root.querySelector('button')!.click();
    root.querySelector('button')!.click();
    fixture.detectChanges();

    expect(root.querySelector('strong')?.textContent).toBe('2');
  });
});
