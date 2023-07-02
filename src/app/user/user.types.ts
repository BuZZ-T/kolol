// export type PlayerClass = 'AccordionThief' | 'DiscoBandit' | 'Pastamancer' | 'Sauceror' | 'SealClubber' | 'TurtleTamer';

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
        level: string;
        moxie: {
          base: string;
          current: string;
        }
        muscle: {
          base: string;
          current: string;
        }
        mysticallity: {
          base: string;
          current: string;
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
