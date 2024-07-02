import { Component, EventEmitter, Input, Output } from '@angular/core';

import { AdventureParserService } from '../../parser/adventure-parser.service';
import { Choice, Option } from '../adventure.types';

@Component({
  selector: 'kolol-choice',
  styleUrls: [ './choice.component.scss' ],
  templateUrl: './choice.component.html',
})
export class ChoiceComponent {

  public constructor(private adventureParserService: AdventureParserService) {
    //
  }

  @Input({ required: true })
  public choice!: Choice;

  @Output()
  public adventureAgain = new EventEmitter<void>();

  @Output()
  public selectChoice = new EventEmitter<{choice: Choice, option: Option}>();
}
