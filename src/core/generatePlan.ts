import type { UserSettings } from './settings';

import dealsData from '@/src/data/deals.json';
import recipesData from '@/src/data/recipes.json';

export interface Ingredient {
  name: string;
  qty: number;
  unit: string;
}

export interface Meal {
  title: string;
  ingredients: Ingredient[];
}

export interface GroceryItem {
  name: string;
  qty: number;
  unit: string;
}

export interface MealPlan {
  meals: Meal[];
  groceryList: GroceryItem[];
}

interface Recipe {
  title: string;
  ingredients: Ingredient[];
  dietStyle: string;
  cookTime: number;
}

const DEALS = dealsData as string[];

function consolidateIngredients(ingredients: Ingredient[]): GroceryItem[] {
  const map = new Map<string, GroceryItem>();
  for (const { name, qty, unit } of ingredients) {
    const key = `${name}|${unit}`;
    const existing = map.get(key);
    if (existing) {
      existing.qty += qty;
    } else {
      map.set(key, { name, qty, unit });
    }
  }
  return Array.from(map.values());
}

function normalize(s: string) {
  return s.toLowerCase().trim();
}

function dealOverlapScore(recipe: Recipe): number {
  const dealSet = new Set(DEALS.map(normalize));
  return recipe.ingredients.filter((i) => dealSet.has(normalize(i.name))).length;
}

export function generatePlan(settings: UserSettings): MealPlan {
  const recipes = recipesData as Recipe[];
  const baseServings = 4;
  const scale = settings.servings / baseServings;

  const filtered = recipes.filter(
    (r) =>
      r.dietStyle === settings.dietStyle &&
      r.cookTime <= settings.maxCookTime
  );

  const candidates = filtered.length > 0 ? filtered : recipes;
  const sorted = [...candidates].sort(
    (a, b) => dealOverlapScore(b) - dealOverlapScore(a)
  );
  const picked = sorted.slice(0, 3);

  const meals: Meal[] = picked.map((r) => ({
    title: r.title,
    ingredients: r.ingredients.map((i) => ({
      ...i,
      qty: Math.round(i.qty * scale * 100) / 100,
    })),
  }));

  const allIngredients = meals.flatMap((m) => m.ingredients);
  const groceryList = consolidateIngredients(allIngredients);

  return { meals, groceryList };
}
