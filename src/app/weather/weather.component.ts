import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import { WeatherInfo } from './weatherInfo';
import * as moment from 'moment';
import * as _ from 'lodash';
import 'bootstrap';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
  providers: [ WeatherService ],
})
export class WeatherComponent implements OnInit {
  errorMessage: string;
  weatherInfo: WeatherInfo;
  weatherInfoImage: string;
  currentLocation = null;
  collapseId = _.uniqueId('collapse');
  accordionId = _.uniqueId('accordion');
  headingId = _.uniqueId('heading');
  constructor (private weatherService: WeatherService) { this.weatherInfoImage=''; }
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
                       weatherInfo => {
                         this.weatherInfo = weatherInfo
                         this.fillWeatherImage();
                        },
                       error =>  this.errorMessage = <any>error);
  }

  fillWeatherImage() {
    if (this.weatherInfo && this.weatherInfo.weather && this.weatherInfo.weather.length > 0 && this.weatherInfo.weather[0].icon) {
      this.weatherInfoImage = 'http://openweathermap.org/img/w/' + this.weatherInfo.weather[0].icon + '.png';
    }    
  }

  locateMe() {
    const that = this;
    navigator.geolocation.getCurrentPosition(function(position) {
      that.currentLocation = position;
    }, function (error) {
      console.log(error);
    });
  }

  getDate(dte) {
    return moment.unix(dte).format('DD/MM/YYYY HH:mm');
  }
}
