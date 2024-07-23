import { Injectable } from '@angular/core';
import { Hotkey } from 'src/app/api/api.types';

import { CacheEntry, InternalCacheEntry } from './cache.types';
import { InventoryEntry } from '../main/inventory/inventory.types';
import { SkillData } from '../main/skills/skills.types';

function createCacheEntry<T>(): CacheEntry<T> {
  const entry: InternalCacheEntry<T> = {
    get() {
      return this.value;
    },
    set(value) {
      this.value = value;
    },
    value: undefined,
  };

  return entry;
}

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  public items: CacheEntry<Record<string, InventoryEntry>> = createCacheEntry();

  public lastAction: CacheEntry<Hotkey> = createCacheEntry();

  public skills: CacheEntry<Record<string, SkillData>> = createCacheEntry();
}
