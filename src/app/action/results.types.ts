import { Item } from '../adventure/adventure.types';

// TODO: Duplicate of EffectData?
export type Effect = {
    duration: string;
    id: string;
    image: string;
    name: string;
}

export type ResultAdventure = { type: 'adventure', value: number }
export type ResultText = { type: 'text', value: string }
export type ResultItem = { type: 'item', value: Item }
export type ResultEffect = {type: 'effect', value: Effect}
export type ResultMeat = { type: 'meat', value: number }
export type ResultStats = { type: 'stats', value: { moxie: number, muscle: number, mysticallity: number } }
export type ResultImage = { type: 'image', value: string }

export type ResultEntry = ResultAdventure | ResultText | ResultItem | ResultEffect | ResultMeat | ResultStats | ResultImage

export type Result = { entries: Array<ResultEntry>; title: string; type: 'result' }
