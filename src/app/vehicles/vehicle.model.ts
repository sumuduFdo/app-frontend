export interface Vehicle {
  _id?: string;
  licencePlate: string;
  make: string;
  model: string;
  year: number;
  transmission: string;
  fuelType: string;
  engineCapacity: number;
  vehicleType: string;
  availability: boolean;
  bodyType?: string;
  motorBikeType?: string;
}
