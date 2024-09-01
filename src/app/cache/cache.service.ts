import { Injectable } from '@angular/core';
import type { Hotkey } from 'src/app/api/api.types';

import type { CacheEntry, InternalCacheEntry } from './cache.types';
import type { Equipment, InventoryEntry } from '../../shared/inventory.types';
import type { SkillData } from '../../shared/skills.types';

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

  public equipment: CacheEntry<Equipment> = createCacheEntry();

  public lastAction: CacheEntry<Hotkey> = createCacheEntry();

  public skills: CacheEntry<Record<string, SkillData>> = createCacheEntry();
}
