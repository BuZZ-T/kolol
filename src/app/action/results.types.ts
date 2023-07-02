export type Item = {
    name: string;
    id: string;
    image: string;
}

// TODO: Duplicate of EffectData?
export type Effect = {
    duration: string;
    id: string;
    image: string;
    name: string;
}

export type Result = {
    adventures: number;
    items: Item[];
    effects: Effect[];
    stats: {
        muscle: number;
        moxie: number;
        mysticallity: number;
    }
}
