import { Component } from '@angular/core';
import { ROUTES } from 'src/app/routing/routing.utils';

@Component({
  selector: 'kolol-tavern',
  styleUrls: [ './tavern.component.scss' ],
  templateUrl: './tavern.component.html',
})
export class TavernComponent {

  public barkeep(): void {
    console.log('Talk to the Bart Ender');
  }

  public pool(): void {
    console.log('Play at the Pool Table');
  }

  public susguy(): void {
    console.log('Talk to the Suspicious-Looking Guy');
  }
  
  public cellarRoute = ROUTES.cellar;
}
