export type Item = {
    name: string;
    id: string;
    image: string;
}

export type Effect = {
    duration: string;
    id: string;
    image: string;
    name: string;
}

export type Result = {
    items: Item[];
    effects: Effect[];
}
