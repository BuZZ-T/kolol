// export type PlayerClass = 'AccordionThief' | 'DiscoBandit' | 'Pastamancer' | 'Sauceror' | 'SealClubber' | 'TurtleTamer';

import { ItemEffect } from '../main/inventory/inventory.types';

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
  /** used for extending  */
  extendEffectId: string;
  /** used for displaying the effect */
  displayEffectId: string;
}

export type SubProgressData = {
  current: number;
  max: number;
}

export type UserData = {
    adventures: string;
    hitPoints: {
      current: string;
      max: string;
    };
    lastAdventure: {
      link: string;
      name: string;
    },
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
    playerClass: PlayerClass;
    effects: EffectData[];
  }

export type FamiliarDescriptionData = {
  description: string;
  effects: ItemEffect[][];
  id: string;
  image: string;
  type: string;
}
