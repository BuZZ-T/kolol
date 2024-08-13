export type Familiar = {
    imageUrl: string;
    name: string;
    stats: string;
}

export type Familiars = {
    current: Familiar;
    familiars: Familiar[];
};
