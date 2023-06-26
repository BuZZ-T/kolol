import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'kolol-button',
  styleUrls: [ './button.component.scss' ],
  templateUrl: './button.component.html',
})
export class ButtonComponent {

  @Input({ required: true })
  public text!: string;

  @Output()
  public clicked = new EventEmitter<void>();
}
