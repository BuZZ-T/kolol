import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import type { ListEntry } from 'src/app/core/list-entry/list-entry.types';

import type { Hotkey } from '../../api/api.types';
import { CacheService } from '../../cache/cache.service';
import type { Fight } from '../adventure.types';

@Component({
  selector: 'kolol-fight',
  styleUrls: [ './fight.component.scss' ],
  templateUrl: './fight.component.html',
})
export class FightComponent {
  #cacheService = inject(CacheService);

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
        const lastAction = this.#cacheService.lastAction.get();
        if (lastAction) {
          this.onHotkey(lastAction);
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

    this.#cacheService.lastAction.set(hotkey);
  }

  public onSkillHotkey(skill: ListEntry): void {
    this.skill.emit(skill.id);
  }

  public onItemHotkey(item: ListEntry): void {
    this.item.emit(item.id);
  }

  public hasDamage(): boolean {
    return Object.values(this.fight.damage).some((damage) => damage > 0);
  }
}
