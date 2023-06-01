export type SkillData = {
    cost: number;
    image: string;
    name: string;
    /** Whether the skill is usable at the moment */
    usable: boolean;
}

export type SkillSection = {
    title: string;
    skills: SkillData[];
}
