import { Component, EventEmitter, HostListener, Output } from '@angular/core';

import { ApiService } from '../../../api/api.service';
import type { Hotkey, HotkeyData, OptionalHotkey } from '../../../api/api.types';
import { imageToAbsolute } from '../../../utils/image.utils';

const codeToHotkeyMap = new Map([ 
  [ 'Digit1', '1' ],
  [ 'Digit2', '2' ],
  [ 'Digit3', '3' ],
  [ 'Digit4', '4' ],
  [ 'Digit5', '5' ],
  [ 'Digit6', '6' ],
  [ 'Digit7', '7' ],
  [ 'Digit8', '8' ],
  [ 'Digit9', '9' ],
  [ 'Digit0', '0' ],
  [ 'Minus', '-' ],
  [ 'Equal', '=' ],
]);

@Component({
  selector: 'kolol-fight-hotkeys',
  styleUrls: [ './fight-hotkeys.component.scss' ],
  templateUrl: './fight-hotkeys.component.html',
})
export class FightHotkeysComponent {

  public hotkeys: HotkeyData | null = null;

  public constructor(apiService: ApiService) {
    apiService.actionBar().subscribe(actionBar => {
      this.hotkeys = actionBar.pages[actionBar.whichpage];
    });    
  }

  public imageToAbsolute = imageToAbsolute;

  @HostListener('document:keydown', [ '$event' ])
  public onKeyDown(event: KeyboardEvent): void {
    if (codeToHotkeyMap.has(event.code)) {
      const key = codeToHotkeyMap.get(event.code);
      const index = this.indices.indexOf(key || '');

      if(~index) {
        const hotkey = this.hotkeys?.[index];
        this.emitAction(hotkey);
      }
    }
  }
  
  public emitAction(hotkey: OptionalHotkey): void {
    if (hotkey) {
      this.action.emit(hotkey);
    }
  }

  @Output()
  public action = new EventEmitter<Hotkey>();
  
  public indices = [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=' ];
}
