import { PlayerClass, SubProgressData, UserData } from './user.types';
import { ApiStatus } from '../api/api.types';
import { IMAGE_PREFIX } from '../utils/constants';

function calculateLevelPoints(level: number): number {
  return (level === 1) ? 0 : (level - 1) * (level - 1) + 4;
}

function currentStatPointsToNextLevel(level: number): number {
  return calculateLevelPoints(level + 1) - calculateLevelPoints(level);
}

function currentProgressPoints(rawStatPoints: number, level: number): number {
  return Math.floor(Math.sqrt(rawStatPoints) - calculateLevelPoints(level));
}

function rawSubPoints(apiStatus: ApiStatus): number {
  const classToRawStat: Record<string, 'rawmoxie' | 'rawmuscle' | 'rawmysticality'> = {
    [PlayerClass.SealClubber]: 'rawmuscle',
    [PlayerClass.TurtleTamer]: 'rawmuscle',
    [PlayerClass.PastaMancer]: 'rawmysticality',
    [PlayerClass.Sauceror]: 'rawmysticality',
    [PlayerClass.DiscoBandit]: 'rawmoxie',
    [PlayerClass.AccordionThief]: 'rawmoxie',
  };

  return parseInt(apiStatus[classToRawStat[parseInt(apiStatus.class, 10) as PlayerClass]], 10);
}

/**
 * Calculates the values for the sub stat progress bar
 * @see https://github.com/kolmafia/kolmafia/blob/main/src/net/sourceforge/kolmafia/KoLCharacter.java
 */
function calculateSubProgress(rawValue: string): SubProgressData {
  const raw = parseInt(rawValue, 10) || 0;
  const base = Math.floor(Math.sqrt(raw));

  const current = raw - base * base;

  const nextBase = base + 1;
  const todo = nextBase * nextBase - raw;
  const max = current + todo;

  return {
    current,
    max,
  };

}

export const mapApiStatusToUserData = (apiStatus: ApiStatus): UserData => ({
  adventures: apiStatus.adventures,
  effects: Object.values(apiStatus.effects).map(([ name, duration, image, skillId ]) => ({
    duration,
    image: `${IMAGE_PREFIX}/itemimages/${image}.gif`,
    name,
    skillId: skillId.substring(6),
  })),
  hitPoints: {
    current: apiStatus.hp,
    max: apiStatus.maxhp.toString(),
  },
  lastAdventure: {
    link: apiStatus.lastadv.link,
    name: apiStatus.lastadv.name,
  },
  meat: apiStatus.meat,
  mojoPoints: {
    current: apiStatus.mp,
    max: apiStatus.maxmp.toString(),
  },
  name: apiStatus.name,
  playerClass: PlayerClass[parseInt(apiStatus.class, 10) - 1] as unknown as PlayerClass, // TODO: Disco Bandit === 5 is sure, rest is unknown
  progress: {
    level: {
      current: apiStatus.level,
      sub: {
        current: currentProgressPoints(rawSubPoints(apiStatus), parseInt(apiStatus.level, 10)),
        max: currentStatPointsToNextLevel(parseInt(apiStatus.level, 10)),
      },
    } ,
    moxie: {
      base: apiStatus.basemoxie,
      current: apiStatus.moxie.toString(),
      sub: calculateSubProgress(apiStatus.rawmoxie),
    },
    muscle: {
      base: apiStatus.basemuscle,
      current: apiStatus.muscle.toString(),
      sub: calculateSubProgress(apiStatus.rawmuscle),
    },
    mysticallity: {
      base: apiStatus.basemysticality,
      current: apiStatus.mysticality.toString(),
      sub: calculateSubProgress(apiStatus.rawmysticality),
    },
  },
});
