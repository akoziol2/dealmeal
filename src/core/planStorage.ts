import AsyncStorage from '@react-native-async-storage/async-storage';

import type { MealPlan } from './generatePlan';

const PLAN_KEY = '@dealmeal/plan';

export async function savePlan(plan: MealPlan): Promise<void> {
  await AsyncStorage.setItem(PLAN_KEY, JSON.stringify(plan));
}

export async function loadPlan(): Promise<MealPlan | null> {
  try {
    const json = await AsyncStorage.getItem(PLAN_KEY);
    return json ? (JSON.parse(json) as MealPlan) : null;
  } catch {
    return null;
  }
}
