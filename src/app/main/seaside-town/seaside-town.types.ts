export type Element = {
    name: string;
    image: string;
    url: string;
    position: {
        top: string;
        left: string;
    }
}

export type SeasideTown = {
    background: string;
    elements: Element[];
}
