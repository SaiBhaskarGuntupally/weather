import { Component } from '@angular/core';
import { WeatherServiceService } from './service/weather-service.service';
import { FormControl, FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  temp_min: any;
  temp_max: any;
  humidity: any;
  wind: any;
  temperature: any;
  cityName: any;
  weatherForm!: FormGroup;
  constructor(
    private service: WeatherServiceService,
    private fb: FormBuilder
  ) {}
  ngOnInit() {
    this.createForm();
    this.cityName = 'london';
    this.weatherProcessing();
  }
  weatherProcessing() {
    this.service.getWeatherData(this.cityName).subscribe({
      next: (response) => {
        this.temperature = response.main.temp;
        this.temp_min = response.main.temp_min;
        this.temp_max = response.main.temp_max;
        this.humidity = response.main.humidity;
        this.wind = response.wind.speed;
        console.log('response', response);
      },
      error: (error) => {
        console.log('error thrown: Unable to find the data of the city');
      },
    });
  }
  onSubmit() {
    console.log('entered the onsubmit');
    this.cityName = this.weatherForm.get('searchBar')?.value;
    console.log('cityName', this.cityName);
    console.log('formvalue:', this.weatherForm);
    this.weatherProcessing();
  }
  createForm() {
    this.weatherForm = this.fb.group({
      searchBar: '',
    });
  }
}
