import { Component, inject, Input, OnChanges, OnInit } from '@angular/core';
import { Vehicle } from '../vehicle.model';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { VehicleService } from '../../shared/vehicle.service';

@Component({
  selector: 'app-vehicle-detail',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './vehicle-detail.component.html',
  styleUrl: './vehicle-detail.component.css',
})
export class VehicleDetailComponent implements OnInit, OnChanges {
  @Input({ required: true }) vehicle!: Vehicle;
  private vehicleService = inject(VehicleService);
  
  editMode: boolean = false;
  vehicleForm: FormGroup = new FormGroup({});


  private buildFormGroup() {
    this.vehicleForm = new FormGroup({
      licencePlate: new FormControl({value: this.vehicle.licencePlate, disabled: true}, [
        Validators.required,
        Validators.pattern(/^[A-Z0-9]{1,7}$/), 
      ]),
      make: new FormControl(this.vehicle.make, [Validators.required]),
      model: new FormControl(this.vehicle.model, [Validators.required]),
      year: new FormControl(this.vehicle.year, [
        Validators.required,
        Validators.pattern(/^\d{4}$/), 
      ]),
      transmission: new FormControl(this.vehicle.transmission, [Validators.required]),
      fuelType: new FormControl(this.vehicle.fuelType, [Validators.required]),
      engineCapacity: new FormControl(this.vehicle.engineCapacity, [
        Validators.required,
        Validators.pattern(/^(0|[1-9]\d*)(\.\d+)?$/), 
      ]),
      vehicleType: new FormControl(this.vehicle.vehicleType, [Validators.required]),
      availability: new FormControl(this.vehicle.availability, [Validators.required]),
      bodyType: new FormControl(this.vehicle.bodyType),
      motorBikeType: new FormControl(this.vehicle.motorBikeType),
    });

    if(this.vehicle.vehicleType === 'Car') {
      this.vehicleForm.get('bodyType')?.addValidators(Validators.required);
    }
    
    if(this.vehicle.vehicleType === 'MotorBike') {
      this.vehicleForm.get('motorBikeType')?.addValidators(Validators.required);
    }

    this.vehicleForm.disable()
    this.editMode = false;
  }

  ngOnInit(): void {
    this.buildFormGroup();
  }

  ngOnChanges(): void {
    this.editMode = false;
    this.buildFormGroup();
  }

  editVehicle() {
    this.editMode = true;
    this.vehicleForm.enable();
    this.vehicleForm.get('licencePlate')?.disable()
  }

  onSubmit() {
    const formData = this.vehicleForm.value;
    formData._id = this.vehicle._id;
    this.vehicleService.updateVehicle(formData);
  }
}
