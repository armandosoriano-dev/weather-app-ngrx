import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '@shared/shared.module';

import { WeatherEffects } from '@app/weather/shared/store/weather.effects';
import { weatherReducer } from '@app/weather/shared/store/weather.reducers';
import { WeatherCardComponent } from '@app/weather/weather-card/weather-card.component';
import { WeatherListComponent } from '@app/weather/weather-list/weather-list.component';
import { WeatherHistoryComponent } from '@app/weather/weather-history/weather-history.component';

@NgModule({
  imports: [
    SharedModule,
    HttpClientModule,
    StoreModule.forFeature('weather', weatherReducer),
    EffectsModule.forFeature([WeatherEffects]),
  ],
  declarations: [
    WeatherListComponent,
    WeatherCardComponent,
    WeatherHistoryComponent,
  ],
  exports: [WeatherListComponent],
  entryComponents: [WeatherHistoryComponent],
})
export class WeatherModule {}
