import { provideHttpClient } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { AppComponent } from './app/components/app/app.component';

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(), provideRouter(routes)],
}).catch((error: unknown) => {
  console.error('Unable to start MyContractor', error);
  const root = document.querySelector('app-root');
  if (root) root.textContent = 'MyContractor could not start. Reload the page to try again.';
});
