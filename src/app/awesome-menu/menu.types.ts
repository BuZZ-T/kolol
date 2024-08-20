import { SkillData } from '../../shared/skills.types';

export type LinkMenuEntry = {
    type: 'link';
    image: string;
    name: string;
    route: string;
}

export type MacroMenuEntry = {
    type: 'macro';
    image: string;
    name: string;
    skills: SkillData[];
}

export type MenuEntry = LinkMenuEntry | MacroMenuEntry;
