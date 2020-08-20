import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Temps } from './temps.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  BASE_URL = 'http://api.openweathermap.org/data/2.5/forecast?q='
  API_KEY = '&appId=d835cd22f0e85507343b84b16c4a1746'

  constructor(
    private http: HttpClient
  ) {}

  // fetchWeather: Observable<Temps>() {
  //   return this.http.get(this.BASE_URL);
  // }

  fetchWeather(city: string) {
    return this.http.get<Temps>(this.BASE_URL + city + this.API_KEY)
      .pipe(
        map((temps: Temps) => {
          return temps;
        })
      )

  }


}
