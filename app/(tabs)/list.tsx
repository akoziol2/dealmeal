import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import type { MealPlan } from '@/src/core/generatePlan';
import { loadPlan } from '@/src/core/planStorage';

export default function ListScreen() {
  const [plan, setPlan] = useState<MealPlan | null>(null);

  useFocusEffect(
    useCallback(() => {
      loadPlan().then(setPlan);
    }, [])
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Grocery List
      </ThemedText>
      {plan?.groceryList?.length ? (
        <ScrollView style={styles.content}>
          {plan.groceryList.map((item, i) => (
            <ThemedText key={i} style={styles.item}>
              • {item.name}: {item.qty} {item.unit}
            </ThemedText>
          ))}
        </ScrollView>
      ) : (
        <ThemedText style={styles.placeholder}>
          Generate a plan in the Plan tab to see your grocery list.
        </ThemedText>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { marginBottom: 16 },
  content: { marginTop: 8 },
  item: { marginBottom: 8 },
  placeholder: { marginTop: 12 },
});
