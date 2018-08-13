import { HttpClientModule } from '@angular/common/http';
import {
  async,
  ComponentFixture,
  TestBed,
  discardPeriodicTasks,
  fakeAsync,
} from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DBModule } from '@ngrx/db';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';

import { schema } from '@app/db';
import { environment } from '@environments/environment';
import { SharedModule } from '@shared/shared.module';

import * as WeatherActions from '@app/weather/shared/store/weather.actions';
import { WeatherEffects } from '@app/weather/shared/store/weather.effects';
import { weatherReducer } from '@app/weather/shared/store/weather.reducers';
import { WeatherCardComponent } from '@app/weather/weather-card/weather-card.component';
import { WeatherListComponent } from '@app/weather/weather-list/weather-list.component';
import { WeatherHistoryComponent } from '@app/weather/weather-history/weather-history.component';

const LOAD_ACTION = new WeatherActions.Load(undefined);
const LOAD_HISTORY_ACTION = new WeatherActions.LoadHistory();

environment.refreshTimeout = 300;

describe('WeatherListComponent', () => {
  let component: WeatherListComponent;
  let fixture: ComponentFixture<WeatherListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        HttpClientModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('weather', weatherReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([WeatherEffects]),
        DBModule.provideDB(schema),
      ],
      declarations: [
        WeatherListComponent,
        WeatherCardComponent,
        WeatherHistoryComponent,
      ],
      providers: [
        {
          provide: Store,
          useValue: {
            dispatch: () => {},
            select: () => of(),
            next: () => of(),
            pipe: () => of(),
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch and store subscriptions OnInit', () => {
    const store = TestBed.get(Store);
    spyOn(store, 'dispatch');
    spyOn(component.subscription, 'add').and.callThrough();

    component.ngOnInit();

    expect(store.dispatch).toHaveBeenCalledWith(LOAD_ACTION);
    expect(component.subscription.add).toHaveBeenCalledTimes(2);
  });

  describe('manageState', () => {
    it('should call to LoadHistory after LoadSuccess', () => {
      const state = {
        type: WeatherActions.WeatherActionTypes.LoadSuccess,
      };
      const store = TestBed.get(Store);
      spyOn(store, 'dispatch');

      component.manageState(state);

      expect(store.dispatch).toHaveBeenCalledWith(LOAD_HISTORY_ACTION);
    });

    it('should open snackbar after LoadError', () => {
      const state = {
        type: WeatherActions.WeatherActionTypes.LoadError,
        payload: {
          code: 400,
          message: 'Message',
        },
      };
      const snackbar = TestBed.get(MatSnackBar);
      spyOn(snackbar, 'open');

      component.manageState(state);

      expect(snackbar.open).toHaveBeenCalled();
    });

    it('should open snackbar after LoadHistoryError', () => {
      const state = {
        type: WeatherActions.WeatherActionTypes.LoadHistoryError,
        payload: {
          code: 400,
          message: 'Message',
        },
      };
      const snackbar = TestBed.get(MatSnackBar);
      spyOn(snackbar, 'open');

      component.manageState(state);

      expect(snackbar.open).toHaveBeenCalled();
    });

    it('should store data after LoadHistorySuccess', () => {
      const state = {
        type: WeatherActions.WeatherActionTypes.LoadHistorySuccess,
        payload: [{}],
      };
      component.data = [];

      component.manageState(state);

      expect(component.data.length).toBe(1);
    });
  });

  it(
    'should dispatch WeatherActions.Load on interval',
    fakeAsync(() => {
      const store = TestBed.get(Store);
      spyOn(store, 'dispatch');
      spyOn(component.interval$, 'subscribe').and.callThrough();

      component.ngOnInit();

      expect(store.dispatch).toHaveBeenCalledWith(LOAD_ACTION);

      discardPeriodicTasks();
    }),
  );

  it('should unsubscribe OnDestroy', () => {
    spyOn(component.subscription, 'unsubscribe');

    component.ngOnDestroy();

    expect(component.subscription.unsubscribe).toHaveBeenCalled();
  });
});
