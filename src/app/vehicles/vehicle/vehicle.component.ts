import { Component, Input} from '@angular/core';
import { Vehicle } from '../vehicle.model';

@Component({
  selector: 'app-vehicle',
  standalone: true,
  imports: [],
  templateUrl: './vehicle.component.html',
  styleUrl: './vehicle.component.css'
})
export class VehicleComponent {
  @Input({required: true}) vehicle!: Vehicle | undefined;

  onSelectVehicle() {}
}
