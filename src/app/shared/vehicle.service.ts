import { Injectable, signal, WritableSignal, computed, viewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Vehicle } from '../vehicles/vehicle.model';
import { map, catchError, tap, filter } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Response } from './response.model';

@Injectable({ providedIn: 'root' })
export class VehicleService {
  private API_URL = 'http://localhost:5000/';
  private headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set('Access-Control-Allow-Origin', '*');

  private vehiclesData: WritableSignal<Vehicle[]> = signal([]);
  vehicles = computed(this.vehiclesData);

  constructor(private httpClient: HttpClient) {}

  private getHttpHeaders = function (): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');
    headers = headers.append('Access-Control-Allow-Origin', '*');
    return headers;
  };

  fetchVehicles() {
    const headers = this.getHttpHeaders();
    this.httpClient
      .get<{ [key: string]: Vehicle[] }>(this.API_URL + 'vehicles', {
        headers: this.headers,
      })
      .subscribe(
        (resData) => {
          if (resData['error'] != null) {
            // there is an error in the app
          }
          console.log('response data: ', resData);
          if (resData.hasOwnProperty('data')) {
            const data = resData['data'];
            // update the vehiclesData array
            this.vehiclesData.update((currentVehicles) => {
              return [...currentVehicles, ...data];
            });
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  updateVehicle(vehicleData: any) {
    console.log(vehicleData);
    if (vehicleData._id !== null) {
      this.httpClient.post<any>(this.API_URL + 'admin/modify-vehicle', JSON.stringify(vehicleData)).subscribe(
        (resData) => {
          if (resData.error != null) {
            // there is an error in the app
          }
          if (resData.hasOwnProperty('data')) {
            const data = resData['data'];
            this.vehiclesData.update(currentVehicles => {
              const filtered = currentVehicles.filter(vehicle => vehicle._id !== vehicleData._id);
              filtered.push(data);
              return data;
            });
          }
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      delete vehicleData._id;
      this.httpClient.post<Response>(this.API_URL + 'add-vehicle', {body: vehicleData}, {headers: this.headers}).subscribe(
        (resData) => {
          if (resData.error != null) {
            // there is an error in the app
          }
          if (resData.hasOwnProperty('data')) {
            const data = resData['data'];
            this.vehiclesData.update((currentVehicles) => {
              return [...currentVehicles, data];
            });
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  deleteVehicle(vehicleId: string) {
    this.httpClient.delete(`${this.API_URL}delete-vehicle/${vehicleId}`, {headers: this.headers}).subscribe(
      (data) => {},
      (error) => {}
    );
  }
}
