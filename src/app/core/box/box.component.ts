import { Component, Input } from '@angular/core';

@Component({
  selector: 'kolol-box',
  styleUrls: [ './box.component.scss' ],
  templateUrl: './box.component.html',
})
export class BoxComponent {

  @Input({ required: true })
  public headline!: string;

  @Input({ required: false })
  public centered = false;
}
