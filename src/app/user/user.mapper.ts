import { PlayerClass, UserData } from './user.types';
import { ApiStatus } from '../api/api.types';
import { IMAGE_PREFIX } from '../utils/constants';
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
    level: apiStatus.level,
    moxie: {
      base: apiStatus.basemoxie,
      current: apiStatus.moxie.toString(),
    },
    muscle: {
      base: apiStatus.basemuscle,
      current: apiStatus.muscle.toString(),
    },
    mysticallity: {
      base: apiStatus.basemysticality,
      current: apiStatus.mysticality.toString(),
    },
  },
});
