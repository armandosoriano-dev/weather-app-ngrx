import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  WeatherData,
  WeatherDataBulkResponse,
} from '@app/weather/shared/weather.model';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private readonly http: HttpClient) {}

  getCitiesData(ids: string): Observable<WeatherData[]> {
    return this.http
      .get<WeatherDataBulkResponse>(
        `${environment.WEATHER_API}/group?id=${ids}&units=metric&appid=${
          environment.WEATHER_API_KEY
        }`,
      )
      .pipe(map(data => data.list));
  }
}
