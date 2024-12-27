export type ShopItemData = {
    buy: {
        action: 'buyitem';
        quantity: string;
        row: string;
        shop: string;
    }
    cost: string;
    descriptionId: string;
    disabled: boolean;
    image: string;
    name: string;
    type: 'item';
}

export type ShopSeparatorData = {
    text: string;
    type: 'separator';
}

export type ShopData = {
    back: {
        text: string;
        url: string;
    };
    image: string;
    items: Array<ShopItemData | ShopSeparatorData>;
    name: string;
    pwd: string;
    text: string;
    title: string;
}
