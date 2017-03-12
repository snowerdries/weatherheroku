// Observable Version
import { Injectable }              from '@angular/core';
import { Http, Response }          from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { WeatherInfo } from './weatherInfo';

@Injectable()
export class WeatherService {
  private weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?q=Antwerp,BE&units=metric&appid=059c8a5c2e2e15362cbebcae80b68e7b';  // URL to web API

  constructor (private http: Http) {}

  getWeather (): Observable<WeatherInfo> {
    return this.http.get(this.weatherUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
  } 

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError (error: Response | any) {    
    return Observable.throw("Error fetching weather info");
  }
}