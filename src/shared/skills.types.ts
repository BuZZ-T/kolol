export type SkillType = 'not-buff' | 'buff' | 'combat' | 'passive'

export type SkillData = {
    cost: number;
    /** How many times a day the skill can be used */
    dailyUseAmount: number | undefined;
    image: string;
    name: string;
    /** Whether the skill is usage from the inventory at all */
    isUsable: boolean;
    /** How many times this day the skill was actually used */
    useAmount: number | undefined;
    description: string;
    id: string;
}

export type SkillsData = {
    NotBuff: SkillData[];
    Buff: SkillData[];
    CombatSkills: SkillData[];
    PassiveSkills: SkillData[];
}

export type SkillsDataWithPwd = {
    pwd: string;
    skills: SkillsData,
}
