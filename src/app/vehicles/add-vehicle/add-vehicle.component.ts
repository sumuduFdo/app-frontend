import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Vehicle } from '../vehicle.model';
import { VehicleService } from '../../shared/vehicle.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-vehicle',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-vehicle.component.html',
  styleUrl: './add-vehicle.component.css',
})
export class AddVehicleComponent {
  @Output() cancel = new EventEmitter();
  private vehicleService = inject(VehicleService);

  editMode: boolean = false;
  vehicleForm: FormGroup = new FormGroup({});

  private buildFormGroup() {
    this.vehicleForm = new FormGroup({
      licencePlate: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Z0-9]{1,7}$/),
      ]),
      make: new FormControl('', [Validators.required]),
      model: new FormControl('', [Validators.required]),
      year: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{4}$/),
      ]),
      transmission: new FormControl('', [
        Validators.required,
      ]),
      fuelType: new FormControl('', [Validators.required]),
      engineCapacity: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(0|[1-9]\d*)(\.\d+)?$/),
      ]),
      vehicleType: new FormControl('', [
        Validators.required,
      ]),
      availability: new FormControl('', [
        Validators.required,
      ]),
      bodyType: new FormControl(''),
      motorBikeType: new FormControl(''),
    });
  }

  onSubmit() {}

  onCancel() {
    this.cancel.emit();
  }
}
