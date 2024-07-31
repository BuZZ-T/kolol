import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Hotkey } from '../../api/api.types';
import { CacheService } from '../../cache/cache.service';
import { Fight } from '../adventure.types';

@Component({
  selector: 'kolol-fight',
  styleUrls: [ './fight.component.scss' ],
  templateUrl: './fight.component.html',
})
export class FightComponent {

  public constructor(private cacheService: CacheService) {
  }
  
  public showHotkeys = true;
  
  @Input({ required: true })
  public fight!: Fight;

  @Output()
  public attack = new EventEmitter<void>();

  @Output()
  public item = new EventEmitter<string>();

  @Output()
  public pickPocket = new EventEmitter<void>();

  @Output()
  public skill = new EventEmitter<string>();

  @Output()
  public runAway = new EventEmitter<void>();

  @Output()
  public macro = new EventEmitter<string>();

  public onHotkey(hotkey: Hotkey): void {
    switch (hotkey.type) {
    case 'action': {
      switch(hotkey.id) {
      case 'attack':
        this.attack.emit();
        break;
      case 'chefstaff':
        // TODO
        break;
      case 'repeat':{
        const hotkey = this.cacheService.lastAction.get();
        if (hotkey) {
          this.onHotkey(hotkey);
        }
        // don't call "lastAction.set()" for this!
        return;
      }
      case 'runaway':
        this.runAway.emit();
        break;
      case 'steal':
        this.pickPocket.emit();
        break;
      }
      break;
    }
    case 'item':
      this.item.emit(hotkey.id);
      break;
    case 'skill':
      this.skill.emit(hotkey.id);
      break;
    case 'macro':
      this.macro.emit(hotkey.id);
      break;
    }

    this.cacheService.lastAction.set(hotkey);
  }

  public hasDamage(): boolean {
    return Object.values(this.fight.damage).some((damage) => damage > 0);
  }
}
