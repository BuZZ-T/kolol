import { PlayerClass, UserData } from './user.types';
import { ApiStatus } from '../api/api.types';
export const mapApiStatusToUserData = (apiStatus: ApiStatus): UserData => ({
    adventures: apiStatus.adventures,
    hitPoints: {
      current: apiStatus.hp,
      max: apiStatus.maxhp.toString(),
    },
    meat: apiStatus.meat,
    mojoPoints: {
      current: apiStatus.mp,
      max: apiStatus.maxmp.toString(),
    },
    name: apiStatus.name,
    playerClass: PlayerClass[parseInt(apiStatus.class, 10)] as unknown as PlayerClass,
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
