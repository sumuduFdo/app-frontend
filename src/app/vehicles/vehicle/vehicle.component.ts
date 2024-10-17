import { Component, EventEmitter, Input, Output} from '@angular/core';
import { Vehicle } from '../vehicle.model';

@Component({
  selector: 'app-vehicle',
  standalone: true,
  imports: [],
  templateUrl: './vehicle.component.html',
  styleUrl: './vehicle.component.css'
})
export class VehicleComponent {
  @Input({required: true}) vehicle!: Vehicle;
  @Output() selectVehicle = new EventEmitter<string>();

  getVehicleType() {
    return this.vehicle.vehicleType === 'Car' ? 1 : 2;
  }

  onSelectVehicle() {
    console.log(this.vehicle);
    this.selectVehicle.emit(this.vehicle._id);
  }
}
