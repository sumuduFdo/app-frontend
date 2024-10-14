import { Component } from '@angular/core';
import { VehicleDetailComponent } from "./vehicle-detail/vehicle-detail.component";
import { VehicleComponent } from "./vehicle/vehicle.component";

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [VehicleDetailComponent, VehicleComponent],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.css'
})
export class VehiclesComponent {

  onSelectVehicle() {}

}
