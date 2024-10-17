import { Component, computed, inject } from '@angular/core';
import { VehicleDetailComponent } from './vehicle-detail/vehicle-detail.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { VehicleService } from '../shared/vehicle.service';
import { AddVehicleComponent } from "./add-vehicle/add-vehicle.component";

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [VehicleDetailComponent, VehicleComponent, AddVehicleComponent],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.css',
})
export class VehiclesComponent {

  addVehicle: boolean = false;

  constructor() {
    this.vehicleService.fetchVehicles();
  }

  private vehicleService = inject(VehicleService);
  selectedVehicleId?: string;

  vehicles = computed(() => this.vehicleService.vehicles());

  get selectedVehicle() {
    const selected =  this.vehicleService.vehicles().find(vehicle => vehicle._id === this.selectedVehicleId);
    return selected;
  }

  onSelectVehicle(id: string) {
    this.selectedVehicleId = id;
  }

  enableAddVehicle() {
    this.addVehicle = true;
  }

  disableAddVehicle() {
    this.addVehicle = false;
  }
}
