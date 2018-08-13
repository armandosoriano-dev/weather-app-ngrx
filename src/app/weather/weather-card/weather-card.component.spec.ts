import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

import { SharedModule } from '@shared/shared.module';

import { WeatherCardComponent } from '@app/weather/weather-card/weather-card.component';

describe('WeatherCardComponent', () => {
  let component: WeatherCardComponent;
  let fixture: ComponentFixture<WeatherCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ SharedModule ],
      declarations: [ WeatherCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open material bottom sheet on .openHistory()', () => {
    const sheet = TestBed.get(MatBottomSheet);
    spyOn(sheet, 'open');

    component.openHistory();

    expect(sheet.open).toHaveBeenCalled();
  });
});
