import { TestBed, async } from '@angular/core/testing';
import { DBModule } from '@ngrx/db';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { WeatherModule } from '@app/weather/weather.module';
import { SharedModule } from '@shared/shared.module';

import { BaseComponent } from '@app/base/base.component';
import { schema } from '@app/db';
import { AppComponent } from '@app/app.component';
import { reducers, metaReducers } from '@app/app.reducers';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, BaseComponent],
      imports: [
        SharedModule,
        StoreModule.forRoot(reducers, { metaReducers }),
        EffectsModule.forRoot([]),
        WeatherModule,
        DBModule.provideDB(schema),
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'Weather App'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Weather App');
  }));
});
