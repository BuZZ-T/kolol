// export type PlayerClass = 'AccordionThief' | 'DiscoBandit' | 'Pastamancer' | 'Sauceror' | 'SealClubber' | 'TurtleTamer';

import type { ItemEffect } from 'src/shared/inventory.types';

export enum PlayerClass {
  SealClubber,
  TurtleTamer,
  PastaMancer,
  Sauceror,
  DiscoBandit,
  AccordionThief,
}

export type EffectData = {
  name: string;
  duration: string;
  image: string;
  skillId: string;
  isExtendable: boolean;
  /** used for displaying the effect */
  effectId: string;
}

export type SubProgressData = {
  current: number;
  max: number;
}

export type UserData = {
  adventures: string;
  ascensions: string;
  duration: {
    currentRun: {
      days: number;
      turns: number;
    }
    total: {
      days: number;
      turns: string;
    }
  }
  fullness: {
    booze: string;
    food: string;
    spleen: string;
  }
  hitPoints: {
    current: string;
    max: string;
  };
  isHardcore: boolean;
  lastAdventure: {
    link: string;
    name: string;
    place: string;
  },
  level: string;
  path: string;
  progress: {
      level: {
        current: string;
        sub: SubProgressData;
      };
      moxie: {
        base: string;
        current: string;
        sub: SubProgressData;
      }
      muscle: {
        base: string;
        current: string;
        sub: SubProgressData;
      }
      mysticality: {
        base: string;
        current: string;
        sub: SubProgressData;
      }
  }
  meat: string;
  mojoPoints: {
    current: string;
    max: string;
  };
  name: string;
  playerId: string;
  playerClass: PlayerClass;
  effects: EffectData[];
  sign: string;
}

export type FamiliarDescriptionData = {
  description: string;
  effects: ItemEffect[][];
  id: string;
  image: string;
  type: string;
}
