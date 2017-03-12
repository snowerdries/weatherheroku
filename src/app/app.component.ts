import { Component, OnInit } from '@angular/core';
import { WeatherService } from './app.service';
import { WeatherInfo } from './weatherInfo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ WeatherService ],
})
export class AppComponent implements OnInit {
  errorMessage: string;
  weatherInfo = new WeatherInfo(0, '', {}, [{}]);
  currentLocation = null;
  constructor (private weatherService: WeatherService) {}

  ngOnInit() {
    this.getWeather();
    this.locateMe();
  }

  getWeather() {
    this.locateMe();
    this.errorMessage = '';
    let lat = 0;
    let lon = 0;
    if (this.currentLocation) {
      lat = this.currentLocation.coords.latitude;
      lon = this.currentLocation.coords.longitude;
    }
    this.weatherService.getWeather(lat,lon)
                     .subscribe(
                       weatherInfo => this.weatherInfo = weatherInfo,
                       error =>  this.errorMessage = <any>error);
  }

  locateMe() {
    const that = this;
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log(position);
      that.currentLocation = position;
    });
  }
}
