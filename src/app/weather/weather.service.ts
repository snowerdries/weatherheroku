// Observable Version
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { WeatherInfo } from './weatherInfo';

@Injectable()
export class WeatherService {
  private weatherUrl = 'https://weatherheroku.herokuapp.com/api/weather';  // URL to web API

  constructor (private http: Http) {}

  getWeather (lat, lon): Observable<WeatherInfo> {
    let query = '';
    if (lat && lon) {
      query = '?lat=' + lat + '&lon=' + lon;
    }
    return this.http.get(this.weatherUrl + query)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  private extractData(res: Response) {
    const body = res.json();
    return body || { };
  }

  private handleError (error: Response | any) {
    return Observable.throw('Error fetching weather info');
  }
}