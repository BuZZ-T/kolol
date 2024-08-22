export type Element = 'sleaze' | 'cold' | 'spooky' | 'stench' | 'hot';

export type Damage = Element | 'physical' | 'offhand';

export type ItemEffect = {
    name: string;
    element: Element | 'none';
    id: string | undefined;
}

export type EquippedItem = {
    image: string | undefined;
    type: string | undefined;
    name: string | undefined;
    strength: string | undefined;
}

export type InventoryEntry = {
    action2: string | undefined;
    action: string | undefined;
    count: string | undefined;
    descriptionId: string | undefined;
    id: string;
    image: string | undefined;
    name: string | undefined;
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

// TODO: name
export type OutfitDescriptionData = {
    effects: ItemEffect[][];
    image: string;
    name: string;
}

export type OutfitData = {
    amount: string;
    id: string;
    name: string;
}

export type SkillEffectData = {
    name: string;
    id: string;
    duration: string;
}

export type SkillEffectDescriptionData = {
    description: string;
    effects: ItemEffect[][];
    image: string;
    name: string;
}

export type ItemDescriptionData = {
    components: string[];
    damage: string | undefined;
    description: string;
    /** The skill a consumable provides */
    effect: SkillEffectData | undefined;
    /** The effects an equipable provides */
    effects: ItemEffect[][];
    image: string;
    isDiscardable: boolean;
    isFreePull: boolean;
    isQuestItem: boolean;
    isTradable: boolean;
    name: string;
    onlyOne: boolean;
    outfit: OutfitData | undefined;
    power: string;
    required: {
      level: string | undefined,
      moxie: string | undefined,
      muscle: string | undefined,
      mysticallity: string | undefined,
    },
    sellingPrice: string | undefined;
    type: {
        text: string;
        quality: string | undefined
    };
}
