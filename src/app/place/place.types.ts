export type Element = {
    name: string;
    image: string;
    url: string;
    position: {
        top: string;
        left: string;
    }
}

export type Place = {
    back:{
        text: string;
        url: string;
    }
    background: {
        height: string;
        image: string;
        width: string;
    }
    elements: Element[];
    name: string;
}
