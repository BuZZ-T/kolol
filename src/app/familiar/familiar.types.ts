export type Familiar = {
    id: string;
    imageUrl: string;
    name: string;
    stats: string;
}

export type Familiars = {
    current: Familiar;
    familiars: Familiar[];
};
