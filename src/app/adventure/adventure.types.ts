import { Damage } from '../../shared/inventory.types';

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
    effects: {
        hpLoss: string;
    }
    item: Item | undefined;
    meat: number;
    jump: 'you' | 'monster' | 'none';
    monster: Monster;
    damage: Record<Damage, number>;
    /* The enemy fumbled */
    isEnemyFumble: boolean;
    /* We fumbled */
    isFumble: boolean;
    enemyDamage: number;
}

// TODO: use InventoryEntry?
export type Item = {
    name: string;
    image: string;
    amount: number;
    id: string;
}

export type FightEnd = {
    type: 'fight-end';
    damage: Record<Damage, number>;
    effects: {
        meat: number;
        moxie: number;
        muscle: number;
        mysticality: number;
    };
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
