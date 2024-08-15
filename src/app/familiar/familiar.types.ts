export type Familiar = {
    id: string;
    imageUrl: string;
    name: string;
    stats: string;
}

export type ExtendedFamiliar = Familiar & {
    qualities: string[];
}

export type Familiars = {
    current: Familiar | undefined;
    favoriteFamiliars: ExtendedFamiliar[];
    familiars: ExtendedFamiliar[];
};
