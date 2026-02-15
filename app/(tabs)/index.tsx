import { useState } from 'react';
import { Button, ScrollView, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { generatePlan } from '@/src/core/generatePlan';
import type { MealPlan } from '@/src/core/generatePlan';
import { savePlan } from '@/src/core/planStorage';
import { loadSettings } from '@/src/core/settings';

export default function PlanScreen() {
  const [plan, setPlan] = useState<MealPlan | null>(null);

  const handleGenerate = async () => {
    const settings = await loadSettings();
    const result = generatePlan(settings);
    await savePlan(result);
    setPlan(result);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Plan
      </ThemedText>
      <Button title="Generate Plan" onPress={handleGenerate} />
      {plan && (
        <ScrollView style={styles.content}>
          {plan.meals.map((meal, i) => (
            <ThemedView key={i} style={styles.mealCard}>
              <ThemedText type="defaultSemiBold">{meal.title}</ThemedText>
              {meal.ingredients.map((ing, j) => (
                <ThemedText key={j} style={styles.ingredient}>
                  • {ing.name}: {ing.qty} {ing.unit}
                </ThemedText>
              ))}
            </ThemedView>
          ))}
        </ScrollView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { marginBottom: 16 },
  content: { marginTop: 20 },
  mealCard: { marginBottom: 12, padding: 12, borderRadius: 8 },
  ingredient: { marginLeft: 8, marginTop: 4 },
});
