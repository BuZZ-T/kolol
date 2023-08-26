export type Element = 'sleaze' | 'cold' | 'spooky' | 'stench' | 'hot';

export type Damage = Element | 'physical' | 'offhand';

export type EquippedItem = {
    image: string | undefined;
    type: string | undefined;
    name: string | undefined;
    strength: string | undefined;
}

export type InventoryEntry = {
    action: string | undefined;
    image: string | undefined;
    name: string | undefined;
    count: string | undefined;
    id: string | undefined;
    quality: string | undefined;
    size: string | undefined;
}

export type InventoryData = {
    consumables: {
        Food: InventoryEntry[];
        Booze: InventoryEntry[];
        Spleen: InventoryEntry[];
        Miscellaneous: InventoryEntry[];
    },
    equipment: {
        Hats: InventoryEntry[];
        Back: InventoryEntry[];
        Shirts: InventoryEntry[];
        Weapons: InventoryEntry[];
        Ranged: InventoryEntry[];
        Off: InventoryEntry[];
        Pants: InventoryEntry[];
        Accessories: InventoryEntry[];
        Familiar: InventoryEntry[];
    },
    miscellaneous: {
        Gift: InventoryEntry[];
        Miscellaneous: InventoryEntry[];
        // (Mostly)
        // (Mostly)
        Quest: InventoryEntry[];
        Bag: InventoryEntry[];
        'Alice\'s': InventoryEntry[];
        'Avatar-Changing': InventoryEntry[]
    }
}

export type Equipment = {
    hat: EquippedItem | undefined;
    weapon: EquippedItem | undefined;
    offhand: EquippedItem | undefined;
    shirt: EquippedItem | undefined;
    pants: EquippedItem | undefined;
    accessories: EquippedItem[];
}

export type InventoryDataWithPwd = {
    pwd: string;
    items: InventoryData;
    currentEquipment: Equipment
}
