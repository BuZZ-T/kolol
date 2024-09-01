import type { Adventure, AdventureError, Choice, Fight, FightEnd, NonFight } from './adventure.types';
import type { Notice } from '../notice/notice.types';

export const isFight = (adventure: Adventure): adventure is Fight =>
  (adventure as Fight).type === 'fight';

export const isNonFight = (adventure: Adventure): adventure is NonFight =>
  (adventure as NonFight).type === 'non-fight';

export const isChoice = (adventure: Adventure | Notice | null): adventure is Choice =>
  (adventure as Choice | null)?.type === 'choice';

export const isFightEnd = (adventure: Adventure): adventure is FightEnd =>
  (adventure as FightEnd).type === 'fight-end';

export const isAdventureError = (adventure: Adventure): adventure is AdventureError => adventure.type === 'adventure-error';
