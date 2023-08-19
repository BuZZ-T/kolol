export type ShopItemData = {
    buy: {
        action: 'buyitem';
        quantity: string;
        row: string;
        shop: string;
    }
    cost: string;
    disabled: boolean;
    image: string;
    name: string;
}

export type ShopData = {
    back: {
        text: string;
        url: string;
    };
    image: string;
    items: ShopItemData[];
    name: string;
    pwd: string;
    text: string;
    title: string;
}
