import { Injectable } from '@angular/core';
import { Database } from '@ngrx/db';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { defer, Observable, of } from 'rxjs';
import { catchError, map, mergeMap, toArray, switchMap } from 'rxjs/operators';

import {
  Load,
  LoadSuccess,
  LoadError,
  LoadHistory,
  LoadHistorySuccess,
  LoadHistoryError,
  WeatherActionTypes,
} from '@app/weather/shared/store/weather.actions';
import { WeatherService } from '@app/weather/shared/weather.service';
import {
  WeatherData,
  WeatherDataHistory,
} from '@app/weather/shared/weather.model';

@Injectable()
export class WeatherEffects {
  @Effect({ dispatch: false })
  openDB$: Observable<any> = defer(() => {
    return this.db.open('weather');
  });

  @Effect()
  load$ = (): Observable<Action> =>
    this.actions$.pipe(
      ofType<Load>(WeatherActionTypes.Load),
      map(action => action.payload.join()),
      mergeMap(ids => {
        // fetch data from service
        return this.service.getCitiesData(ids).pipe(
          switchMap(data => {
            // fetch data from database
            return this.db.query('weather').pipe(
              toArray(),
              // process and stores data
              switchMap(queryData => {
                const processedData = this.processData(data, queryData);
                /*
                 * Need to subscribe to make observable effective... bad hack i know
                 * Ideally a new Action might be hitting this so subscription would
                 * be done automatically
                 */
                this.db.insert('weather', processedData).subscribe(_ => {});
                return processedData;
              }),
            );
          }),
          switchMap(_ => this.db.query('weather')),
          map(_ => new LoadSuccess()),
          catchError(err =>
            of(
              new LoadError({
                code: err.error.cod,
                message: err.error.message,
              }),
            ),
          ),
        );
      }),
    )

  @Effect()
  loadHistory$ = (): Observable<Action> =>
    this.actions$.pipe(
      ofType<LoadHistory>(WeatherActionTypes.LoadHistory),
      switchMap(_ => {
        return this.db.query('weather').pipe(
          toArray(),
          map(data => new LoadHistorySuccess(data)),
          catchError(err =>
            of(
              new LoadHistoryError({
                code: err.error.cod,
                message: err.error.message,
              }),
            ),
          ),
        );
      }),
    )

  constructor(
    private actions$: Actions,
    private service: WeatherService,
    private db: Database,
  ) {}

  /**
   * Manages data to get an history-based model
   * @param data
   */
  private processData(
    data: WeatherData[],
    queryData: WeatherDataHistory[],
  ): WeatherDataHistory[] {
    let processedData = [];

    data.forEach(item => {
      let cityData = queryData.find(it => it.id === item.id);

      if (cityData) {
        // if city already exists, updates history
        cityData.history = [...cityData.history, item];
      } else {
        // else, creates weather data history model
        cityData = {
          id: item.id,
          history: [item],
        };
      }

      // and updates the main array
      processedData = [...processedData, cityData];
    });

    return processedData;
  }
}
