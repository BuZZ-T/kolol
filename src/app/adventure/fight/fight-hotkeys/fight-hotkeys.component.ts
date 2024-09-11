import type { OnChanges, SimpleChanges } from '@angular/core';
import { Component, EventEmitter, HostListener, Input, Output, inject } from '@angular/core';
import type { ListEntry } from 'src/app/core/list-entry/list-entry.types';

import { HotkeyPopupService } from './hotkey-popup.service';
import { ApiService } from '../../../api/api.service';
import type { Hotkey, HotkeyData, OptionalHotkey } from '../../../api/api.types';
import { CacheService } from '../../../cache/cache.service';
import { imageToAbsolute } from '../../../utils/image.utils';
import type { Fight, FightEnd, LimitedUsableSkill, UsableSkill } from '../../adventure.types';

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
export class FightHotkeysComponent implements OnChanges {
  #apiService = inject(ApiService);
  #cacheService = inject(CacheService);
  #hotkeyPopupService = inject(HotkeyPopupService);

  public hotkeys: HotkeyData | null = null;

  public readonly hotkeyEnabled: Record<number, boolean> = {};

  public constructor() {
    this.#apiService.actionBar().subscribe(actionBar => {
      this.hotkeys = actionBar.pages[actionBar.whichpage];

      this.#checkEnabed();
    });    
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['fight']) {
      this.#checkEnabed();
    }
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
    if (this.#isSetAndEnabled(hotkey)) {
      this.action.emit(hotkey);
    }
  }

  @Input({ required: true })
  public fight!: Fight | FightEnd;

  @Output()
  public action = new EventEmitter<Hotkey>();

  @Output()
  public skill = new EventEmitter<ListEntry>();

  @Output()
  public item = new EventEmitter<ListEntry>();
  
  public indices = [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=' ];

  public hotkeyImage(hotkey: Hotkey | null): string {
    if (this.fight.type === 'fight-end' && hotkey?.id === 'repeat') {
      return imageToAbsolute('advagain');
    }
    if (hotkey?.type === 'action' && hotkey.id === 'attack') {
      // we have to set the correct image manually, as the actionbar sometimes returns old images
      const { weapon } = this.#cacheService.equipment.get() || {};
      
      return weapon?.image || imageToAbsolute('confused');
    }

    return hotkey ? imageToAbsolute(hotkey.pic) : '';
  }

  public hotkeyText(hotkey: Hotkey | null): string {
    switch (hotkey?.type) {
    case 'item': {
      const items = this.#cacheService.items.get();
      const item = items?.[hotkey?.id || ''];
    
      if (!item) {
        return 'item not found';
      }
    
      return `${item.name} (${item.count})`;
    }
    case 'skill': {
      const skills = this.#cacheService.skills.get();
      const skill = skills?.[hotkey?.id || ''];
    
      if (!skill) {
        return 'skill not found';
      }
    
      return `${skill.name} (${skill.cost}MP)`;
    }
    case 'action':
      switch(hotkey.id) {
      case 'repeat': {
        if (this.fight.type === 'fight-end' && hotkey?.id === 'repeat') {
          return 'Adventure again';
        }
        const lastAction = this.#cacheService.lastAction.get();
        if (lastAction?.id === 'steal') {
          return '(Can\'t steal twice)';
        }
        return lastAction ? `Repeat (${lastAction.id})` : '(not available)';
      }
      case 'steal':
        return 'Steal';
      case 'attack': {
        const { weapon } = this.#cacheService.equipment.get() || {};

        if (!weapon?.name) {
          return 'Attack with unknown weapon';
        }
        return `Attack with your ${weapon.name}`;
      }
      case 'runaway':
        return 'Run away';
      }
      return '';
    case 'macro': {
      const macros = this.#cacheService.combatUsables.get()?.macros;
      const name = macros?.find(macro => macro.id === hotkey.id)?.name;

      return name ? `Macro: ${name}` : 'Macro';
    }
    default:
      return '';
    }
  }

  #isUsableSkill(skill: UsableSkill | LimitedUsableSkill): skill is UsableSkill {
    return 'cost' in skill;
  }

  public openSkillList(element: Element): void {
    const skills = this.#cacheService.combatUsables.get()?.skills || [];

    const skillList: ListEntry[] = skills.map(skill => ({
      id: skill.id,
      image: skill.image,
      subTitle: this.#isUsableSkill(skill) ? `${skill.cost}MP` : `${skill.usesLeft} uses left per day`,
      title: skill.name,
    }));
    
    this.#hotkeyPopupService.showCombatSkills(skillList, element).subscribe(skill => {
      this.skill.emit(skill);
    });
  }

  public openItemsList(element: Element): void {
    const items = this.#cacheService.combatUsables.get()?.items || [];

    const itemList: ListEntry[] = Object.values(items).map(item => ({
      id: item.id,
      image: item.image,
      title: `${item.name} (${item.amount})`,
    }));
    
    this.#hotkeyPopupService.showCombatItems(itemList, element).subscribe(item => {
      this.item.emit(item);
    });
  }

  #checkEnabed(): void {
    this.hotkeys?.forEach((hotkey, index) => {
      this.hotkeyEnabled[index] = this.#isSetAndEnabled(hotkey);
    });
  }

  /**
   * Is also a type guard for OptionalHotkey to Hotkey, to narrow the type
   */
  #isSetAndEnabled(hotkey: OptionalHotkey): hotkey is Hotkey {
    if (!hotkey) {
      return false;
    }
    switch (hotkey.type) {
    case 'item': {
      const items = this.#cacheService.items.get();
      return !!items && !!items[hotkey.id];
    }
    case 'skill': {
      const skills = this.#cacheService.skills.get();
      // TODO: have enough mana?
      return !!skills && !!skills[hotkey.id];
    }
    case 'action': {
      switch(hotkey.id) {
      case 'repeat': {
        const lastAction = this.#cacheService.lastAction.get();
        return this.fight.type === 'fight-end' || (!!lastAction && lastAction.id !== 'steal');
      }
      case 'steal':
        return this.fight.type === 'fight' && this.fight.jump === 'you';
      default:
        return true;
      }
    }
    default:
      return true;
    }
  }
}
