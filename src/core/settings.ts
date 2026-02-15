import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@dealmeal/settings';

export type DietStyle = 'balanced' | 'high-protein' | 'vegetarian';
export type MaxCookTime = 15 | 30 | 45;

export interface UserSettings {
  weeklyBudget: number;
  servings: number;
  dietStyle: DietStyle;
  maxCookTime: MaxCookTime;
}

export const DEFAULT_SETTINGS: UserSettings = {
  weeklyBudget: 75,
  servings: 4,
  dietStyle: 'balanced',
  maxCookTime: 30,
};

export async function loadSettings(): Promise<UserSettings> {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    if (json) {
      const parsed = JSON.parse(json) as Partial<UserSettings>;
      return { ...DEFAULT_SETTINGS, ...parsed };
    }
  } catch (_) {}
  return DEFAULT_SETTINGS;
}

export async function saveSettings(settings: UserSettings): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}
