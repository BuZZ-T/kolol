import type { Damage } from '../../shared/inventory.types';
import type { EffectData } from '../user/user.types';

type Monster = {
    image: {
        height: string;
        url: string;
        width: string;
    };
    name: string;
}

export type Fight = {
    type: 'fight';
    effectLikes: EffectData[];
    item: Item | undefined;
    meat: number;
    jump: 'you' | 'monster' | 'none';
    monster: Monster;
    damage: Record<Damage, number>;
    /* The enemy fumbled */
    isEnemyFumble: boolean;
    /* We fumbled */
    isFumble: boolean;
    isCritical: boolean;
    isEnemyCritical: boolean;
    usables: AdventureUsables;
}

// TODO: use InventoryEntry?
export type Item = {
    name: string;
    image: string;
    amount: number;
    id: string;
}

export type Stats = {
    hasMoxieUpgrade: boolean;
    hasMuscleUpgrade: boolean;
    hasMysticalityUpgrade: boolean;
    moxie: number;
    muscle: number;
    mysticality: number;
}

export type FightEnd = {
    type: 'fight-end';
    damage: Record<Damage, number>;
    effects: {
        meat: number;
    };
    stats: Stats;
    goBack: string;
    snarfblat: string;
    items: Item[];
    monster: Monster;
    result: 'won' | 'lost' | 'run-away';
}

export type NonFight = {
    type: 'non-fight';
    description: string;
    image: string;
    items: Item[];
    title: string;
    snarfblat: string;
};

export type Option = {
    option: string;
    text: string;
}

export type Choice = {
    description: string;
    image: string;
    options: Option[];
    pwd: string;
    title: string;
    type: 'choice';
    which: string;
};

export type AdventureError = {
    type: 'adventure-error';
    error: string;
}

export type Adventure = AdventureError | Fight | FightEnd | NonFight | Choice;

export type AdventureUsable = {
    id: string;
    image: string;
    name: string;
}

export type UsableItem = {
    amount: number;
} & AdventureUsable;

export type UsableSkill = {
    cost: number;
} & AdventureUsable;

export type LimitedUsableSkill = {
    usesLeft: number;
} & AdventureUsable;

export type AdventureUsables = {
    items: UsableItem[];
    macros: AdventureUsable[];
    skills: Array<UsableSkill | LimitedUsableSkill>;
}
