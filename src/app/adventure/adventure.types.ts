import { Damage } from '../main/inventory/inventory.types';

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

export type Adventure = Fight | FightEnd | NonFight | Choice;
