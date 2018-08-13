import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material';

@Component({
  selector: 'app-weather-history',
  templateUrl: './weather-history.component.html',
  styleUrls: ['./weather-history.component.scss'],
})
export class WeatherHistoryComponent {
  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {}
}
