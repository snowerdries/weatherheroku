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

  getWeatherImage() {
    if (this.weatherInfo && this.weatherInfo.weather && this.weatherInfo.weather.length > 0 && this.weatherInfo.weather[0].icon) {
      return 'http://openweathermap.org/img/w/' + this.weatherInfo.weather[0].icon + '.png';

    }
    return '';
  }

  locateMe() {
    const that = this;
    navigator.geolocation.getCurrentPosition(function(position) {
      that.currentLocation = position;
    }, function (error) {
      console.log(error);
    });
  }
}
