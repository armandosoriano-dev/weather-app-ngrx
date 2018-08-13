import {
  WeatherActionsUnion,
  WeatherActionTypes,
} from '@app/weather/shared/store/weather.actions';

// tslint:disable-next-line
export interface State {}

const initialState = {
  type: '[Weather] Initial',
};

export function weatherReducer(
  _state: State = initialState,
  action: WeatherActionsUnion,
): State {
  switch (action.type) {
    case WeatherActionTypes.LoadHistorySuccess:
    case WeatherActionTypes.LoadError:
    case WeatherActionTypes.LoadHistoryError:
      return {
        type: action.type,
        payload: action.payload,
      };
    case WeatherActionTypes.Load:
    case WeatherActionTypes.LoadSuccess:
    case WeatherActionTypes.LoadHistory:
    default:
      return {
        type: action.type,
      };
  }
}
