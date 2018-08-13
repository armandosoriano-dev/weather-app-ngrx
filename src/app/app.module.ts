import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DBModule } from '@ngrx/db';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { WeatherModule } from '@app/weather/weather.module';
import { SharedModule } from '@shared/shared.module';

import { BaseComponent } from '@app/base/base.component';
import { schema } from '@app/db';
import { AppComponent } from '@app/app.component';
import { reducers, metaReducers } from '@app/app.reducers';

@NgModule({
  declarations: [AppComponent, BaseComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([]),
    WeatherModule,
    DBModule.provideDB(schema),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
