import { Routes } from '@angular/router';
import { CounterComponent } from './components/counter/counter.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, title: 'Home | MyContractor' },
  { path: 'counter', component: CounterComponent, title: 'Counter | MyContractor' },
  { path: 'fetch-data', component: FetchDataComponent, title: 'Weather forecast | MyContractor' },
  { path: '**', redirectTo: 'home' },
];
