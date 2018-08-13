import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { DBModule } from '@ngrx/db';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';

import { schema } from '@app/db';
import { environment } from '@environments/environment';
import { SharedModule } from '@shared/shared.module';

import { BaseComponent } from '@app/base/base.component';
import { WeatherEffects } from '@app/weather/shared/store/weather.effects';
import { weatherReducer } from '@app/weather/shared/store/weather.reducers';
import { WeatherCardComponent } from '@app/weather/weather-card/weather-card.component';
import { WeatherListComponent } from '@app/weather/weather-list/weather-list.component';

describe('BaseComponent', () => {
  let component: BaseComponent;
  let fixture: ComponentFixture<BaseComponent>;

  beforeEach(
    fakeAsync(() => {
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
          BaseComponent,
          WeatherCardComponent,
          WeatherListComponent,
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
      })
        .overrideComponent(BaseComponent, {
          set: {
            templateUrl: './base.component.mock.html',
          },
        })
        .compileComponents();

      fixture = TestBed.createComponent(BaseComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should compile', done => {
    expect(component).toBeTruthy();
    fixture.whenStable().then(() => {
      done();
    });
  });
});
