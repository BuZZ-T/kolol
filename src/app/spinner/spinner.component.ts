import { Component, Input } from '@angular/core';

@Component({
  selector: 'kolol-spinner',
  styleUrls: [ './spinner.component.scss' ],
  templateUrl: './spinner.component.html',
})
export class SpinnerComponent {

  @Input()
  public withBox = true;

  @Input()
  public fullHeight = false;
}
