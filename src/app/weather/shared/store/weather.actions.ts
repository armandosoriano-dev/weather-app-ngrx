import { Action } from '@ngrx/store';

import {
  WeatherData,
  WeatherDataErrorResponse,
} from '@app/weather/shared/weather.model';

export enum WeatherActionTypes {
  Load = '[Weather] Load Weather Data',
  LoadSuccess = '[Weather] Weather Data Loaded',
  LoadError = '[Weather] Weather Data Error',
  LoadHistory = '[Weather] Load City Weather History',
  LoadHistorySuccess = '[Weather] Load City Weather History Success',
  LoadHistoryError = '[Weather] Load City Weather History Error',
}

export class Load implements Action {
  readonly type = WeatherActionTypes.Load;

  constructor(public payload: number[]) {}
}

export class LoadSuccess implements Action {
  readonly type = WeatherActionTypes.LoadSuccess;
}

export class LoadError implements Action {
  readonly type = WeatherActionTypes.LoadError;

  constructor(public payload: WeatherDataErrorResponse) {}
}

export class LoadHistory implements Action {
  readonly type = WeatherActionTypes.LoadHistory;
}

export class LoadHistorySuccess implements Action {
  readonly type = WeatherActionTypes.LoadHistorySuccess;

  constructor(public payload: WeatherData[]) {}
}

export class LoadHistoryError implements Action {
  readonly type = WeatherActionTypes.LoadHistoryError;

  constructor(public payload: WeatherDataErrorResponse) {}
}

export type WeatherActionsUnion =
  | Load
  | LoadSuccess
  | LoadError
  | LoadHistory
  | LoadHistorySuccess
  | LoadHistoryError;
