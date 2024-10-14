import { Routes } from '@angular/router';

import { VehiclesComponent } from './vehicles/vehicles.component';
import { RentalsComponent } from './rentals/rentals.component';

export const routes: Routes = [
  { path: 'vehicles', component: VehiclesComponent },
  { path: 'rentals', component: RentalsComponent },
  { path: '', redirectTo: '/vehicles', pathMatch: 'full' },
  { path: '**', redirectTo: '/', pathMatch: 'full' }, // fallback route
];
