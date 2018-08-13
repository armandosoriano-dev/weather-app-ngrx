import { Component } from '@angular/core';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export class BaseComponent {
  /**
   * IDs to retrieve cities data. Marked as readonly just because this app
   * requirements is to fetch some static cities.
   */
  readonly cityIds: number[] = environment.cityIds;
}
