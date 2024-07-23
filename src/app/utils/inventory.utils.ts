import { InventoryData, InventoryEntry } from '../main/inventory/inventory.types';
import { SkillData, SkillsData } from '../main/skills/skills.types';

export const itemMapFromInventory = (inventory: InventoryData): Record<string, InventoryEntry> =>
  Object.values(inventory).reduce((acc, category) => {
    Object.values(category).forEach(items => {
      items.forEach(item => acc[item.id] = item);
    });

    return acc;
  }, {} as Record<string, InventoryEntry>);

export const combatSkillMapFromSkills = (skills: SkillsData): Record<string, SkillData> =>
  skills.CombatSkills.reduce((acc, skill) => {
    acc[skill.id] = skill;

    return acc;
  }, {} as Record<string, SkillData>);
