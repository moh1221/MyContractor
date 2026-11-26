import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
})
export class CounterComponent {
  readonly currentCount = signal(0);

  incrementCounter(): void {
    this.currentCount.update((count) => count + 1);
  }
}
