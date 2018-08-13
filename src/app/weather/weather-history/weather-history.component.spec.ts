import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material';

import { SharedModule } from '@shared/shared.module';

import { WeatherHistoryComponent } from '@app/weather/weather-history/weather-history.component';

describe('WeatherHistoryComponent', () => {
  let component: WeatherHistoryComponent;
  let fixture: ComponentFixture<WeatherHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ SharedModule ],
      declarations: [ WeatherHistoryComponent ],
      providers: [
        { provide: MAT_BOTTOM_SHEET_DATA, useValue: [] },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
