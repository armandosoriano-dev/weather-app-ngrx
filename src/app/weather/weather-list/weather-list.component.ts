import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store, select } from '@ngrx/store';
import { Subscription, interval } from 'rxjs';

import * as WeatherActions from '@app/weather/shared/store/weather.actions';
import { WeatherDataHistory } from '@app/weather/shared/weather.model';
import { State } from '@app/weather/shared/store/weather.reducers';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-weather-list',
  templateUrl: './weather-list.component.html',
  styleUrls: ['./weather-list.component.scss'],
})
export class WeatherListComponent implements OnInit, OnDestroy {
  @Input() cityIds: number[];
  data: WeatherDataHistory[] = [];
  subscription = new Subscription();
  interval$ = interval(environment.refreshTimeout);

  constructor(
    private readonly store: Store<State>,
    private readonly snackbar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new WeatherActions.Load(this.cityIds));

    this.subscription.add(
      this.store.pipe(select('weather')).subscribe(this.manageState.bind(this)),
    );

    this.subscription.add(
      // refresh data interval here
      this.interval$.subscribe(_ => {
        this.store.dispatch(new WeatherActions.Load(this.cityIds));
      }),
    );
  }

  manageState(state: { type: string; payload?: any }): void {
    switch (state.type) {
      case WeatherActions.WeatherActionTypes.LoadSuccess:
        this.store.dispatch(new WeatherActions.LoadHistory());
        break;
      case WeatherActions.WeatherActionTypes.LoadHistorySuccess:
        this.data = state.payload;
        break;
      case WeatherActions.WeatherActionTypes.LoadError:
      case WeatherActions.WeatherActionTypes.LoadHistoryError:
        this.snackbar.open(state.payload.message);
        break;
      default:
        break;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
