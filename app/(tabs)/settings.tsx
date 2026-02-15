import { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import type { DietStyle, MaxCookTime, UserSettings } from '@/src/core/settings';
import { loadSettings, saveSettings } from '@/src/core/settings';

const DIET_OPTIONS: DietStyle[] = ['balanced', 'high-protein', 'vegetarian'];
const COOK_TIME_OPTIONS: MaxCookTime[] = [15, 30, 45];

export default function SettingsScreen() {
  const inputBg = useThemeColor({ light: '#fff', dark: '#2a2a2a' }, 'background');
  const inputBorder = useThemeColor({ light: '#ccc', dark: '#555' }, 'icon');
  const inputText = useThemeColor({}, 'text');
  const [weeklyBudget, setWeeklyBudget] = useState('');
  const [servings, setServings] = useState('');
  const [dietStyle, setDietStyle] = useState<DietStyle>('balanced');
  const [maxCookTime, setMaxCookTime] = useState<MaxCookTime>(30);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadSettings().then((s) => {
      setWeeklyBudget(String(s.weeklyBudget));
      setServings(String(s.servings));
      setDietStyle(s.dietStyle);
      setMaxCookTime(s.maxCookTime);
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const settings: UserSettings = {
      weeklyBudget: Number(weeklyBudget) || 0,
      servings: Number(servings) || 1,
      dietStyle,
      maxCookTime,
    };
    saveSettings(settings);
  }, [loaded, weeklyBudget, servings, dietStyle, maxCookTime]);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Settings
      </ThemedText>
      <View style={styles.row}>
        <ThemedText style={styles.label}>Weekly budget ($)</ThemedText>
        <TextInput
          style={[styles.input, { backgroundColor: inputBg, borderColor: inputBorder, color: inputText }]}
          value={weeklyBudget}
          onChangeText={setWeeklyBudget}
          keyboardType="numeric"
          placeholder="75"
          placeholderTextColor={inputBorder}
        />
      </View>
      <View style={styles.row}>
        <ThemedText style={styles.label}>Servings</ThemedText>
        <TextInput
          style={[styles.input, { backgroundColor: inputBg, borderColor: inputBorder, color: inputText }]}
          value={servings}
          onChangeText={setServings}
          keyboardType="numeric"
          placeholder="4"
          placeholderTextColor={inputBorder}
        />
      </View>
      <View style={styles.row}>
        <ThemedText style={styles.label}>Diet style</ThemedText>
        <View style={styles.pickerWrap}>
          {DIET_OPTIONS.map((opt) => (
            <ThemedText
              key={opt}
              style={[styles.pickerItem, dietStyle === opt && styles.pickerItemActive]}
              onPress={() => setDietStyle(opt)}
            >
              {opt}
            </ThemedText>
          ))}
        </View>
      </View>
      <View style={styles.row}>
        <ThemedText style={styles.label}>Max cook time (min)</ThemedText>
        <View style={styles.pickerWrap}>
          {COOK_TIME_OPTIONS.map((opt) => (
            <ThemedText
              key={opt}
              style={[styles.pickerItem, maxCookTime === opt && styles.pickerItemActive]}
              onPress={() => setMaxCookTime(opt)}
            >
              {opt}
            </ThemedText>
          ))}
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { marginBottom: 20 },
  row: { marginBottom: 16 },
  label: { marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  pickerWrap: { flexDirection: 'row', gap: 12 },
  pickerItem: { padding: 8 },
  pickerItemActive: { fontWeight: 'bold' },
});
