import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

import { WeatherData } from '@app/weather/shared/weather.model';
import { WeatherHistoryComponent } from '@app/weather/weather-history/weather-history.component';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherCardComponent {
  @Input() data: WeatherData;
  @Input() history: WeatherData[];

  constructor(private readonly sheet: MatBottomSheet) {}

  openHistory(): void {
    this.sheet.open(WeatherHistoryComponent, {
      data: this.history,
    });
  }
}
