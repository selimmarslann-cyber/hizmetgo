/**
 * Hizmetgo - Skills/Keywords Data
 * Extracted from service categories for job matching
 */

import type { SkillKeyword, Sector } from "../types/mahallem";
import { SERVICE_CATEGORIES } from "./service-categories";

/**
 * Convert service categories to skills format
 */
export function getSkillsFromCategories(): SkillKeyword[] {
  const skills: SkillKeyword[] = [];

  SERVICE_CATEGORIES.forEach((category) => {
    // Add main category keywords
    category.keywords.forEach((keyword, idx) => {
      skills.push({
        id: `${category.id}-main-${idx}`,
        label: keyword,
        sector: category.name,
      });
    });

    // Add sub-service keywords
    category.subServices?.forEach((subService) => {
      subService.keywords.forEach((keyword, idx) => {
        skills.push({
          id: `${category.id}-${subService.id}-${idx}`,
          label: keyword,
          sector: category.name,
        });
      });
    });
  });

  return skills;
}

/**
 * Get sectors (main categories)
 */
export function getSectors(): Sector[] {
  return SERVICE_CATEGORIES.map((category) => ({
    id: category.id,
    name: category.name,
    keywords: [
      ...category.keywords.map((kw, idx) => ({
        id: `${category.id}-main-${idx}`,
        label: kw,
        sector: category.name,
      })),
      ...(category.subServices?.flatMap((sub) =>
        sub.keywords.map((kw, idx) => ({
          id: `${category.id}-${sub.id}-${idx}`,
          label: kw,
          sector: category.name,
        })),
      ) || []),
    ],
  }));
}

/**
 * Get skills by sector
 */
export function getSkillsBySector(sectorId: string): SkillKeyword[] {
  const sector = SERVICE_CATEGORIES.find((c) => c.id === sectorId);
  if (!sector) return [];

  const skills: SkillKeyword[] = [];

  sector.keywords.forEach((keyword, idx) => {
    skills.push({
      id: `${sector.id}-main-${idx}`,
      label: keyword,
      sector: sector.name,
    });
  });

  sector.subServices?.forEach((subService) => {
    subService.keywords.forEach((keyword, idx) => {
      skills.push({
        id: `${sector.id}-${subService.id}-${idx}`,
        label: keyword,
        sector: sector.name,
      });
    });
  });

  return skills;
}

/**
 * All available skills (cached)
 */
let cachedSkills: SkillKeyword[] | null = null;
export function getAllSkills(): SkillKeyword[] {
  if (!cachedSkills) {
    cachedSkills = getSkillsFromCategories();
  }
  return cachedSkills;
}
