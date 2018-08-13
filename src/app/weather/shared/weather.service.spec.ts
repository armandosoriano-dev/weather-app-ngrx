import { HttpClient } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';
import { Observable, of } from 'rxjs';

import { WeatherService } from '@app/weather/shared/weather.service';
import { environment } from '@environments/environment';

const QUICK_N_DIRTY_HTTP_MOCK = {
  get: (_url: string): Observable<any> => {
    return of({ list: [{}] });
  },
};

describe('WeatherService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WeatherService,
        { provide: HttpClient, useValue: QUICK_N_DIRTY_HTTP_MOCK },
      ],
    });
  });

  it('should be created', inject(
    [WeatherService],
    (service: WeatherService) => {
      expect(service).toBeTruthy();
    },
  ));

  it('should getCitiesData()', inject(
    [WeatherService],
    (service: WeatherService) => {
      // No need to use HttpClientTesting from Angular
      const http = TestBed.get(HttpClient);
      spyOn(http, 'get').and.returnValue(of({ list: [{}] }));

      service.getCitiesData(environment.cityIds.join()).subscribe(res => {
        expect(res.length).toBe(1);
      });

      expect(http.get).toHaveBeenCalled();
    },
  ));
});
