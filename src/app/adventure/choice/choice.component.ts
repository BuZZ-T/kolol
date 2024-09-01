import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Choice, Option } from '../adventure.types';

@Component({
  selector: 'kolol-choice',
  styleUrls: [ './choice.component.scss' ],
  templateUrl: './choice.component.html',
})
export class ChoiceComponent {

  @Input({ required: true })
  public choice!: Choice;

  @Output()
  public adventureAgain = new EventEmitter<void>();

  @Output()
  public selectChoice = new EventEmitter<{choice: Choice, option: Option}>();
}
