import React from 'react';
import { View, Text, Switch, StyleSheet, ScrollView } from 'react-native';
import { useApp } from '../context/AppContext';
import { COLORS } from '../utils/constants';

const newsCategories = [
  'business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'
];

export const SettingsScreen: React.FC = () => {
  const { state, dispatch } = useApp();
  const toggleTemperatureUnit = () => {
    const newUnit = state.settings.temperatureUnit === 'celsius' ? 'fahrenheit' : 'celsius';
    dispatch({
      type: 'UPDATE_SETTINGS',
      payload: { temperatureUnit: newUnit },
    });
  };

  const toggleNewsCategory = (category: string) => {
    const currentCategories = state.settings.newsCategories;
    const newCategories = currentCategories.includes(category)
      ? currentCategories.filter(c => c !== category)
      : [...currentCategories, category];
    
    dispatch({
      type: 'UPDATE_SETTINGS',
      payload: { newsCategories: newCategories },
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Temperature Units</Text>
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Celsius</Text>
          <Switch
            value={state.settings.temperatureUnit === 'fahrenheit'}
            onValueChange={toggleTemperatureUnit}
            trackColor={{ false: COLORS.BORDER, true: COLORS.PRIMARY }}
            thumbColor={state.settings.temperatureUnit === 'fahrenheit' ? COLORS.PRIMARY : '#f4f3f4'}
          />
          <Text style={styles.switchLabel}>Fahrenheit</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>News Categories</Text>
        <Text style={styles.sectionSubtitle}>
          Select categories to include in your news feed
        </Text>
        {newsCategories.map(category => (
          <View key={category} style={styles.categoryContainer}>
            <Text style={styles.categoryText}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Text>
            <Switch
              value={state.settings.newsCategories.includes(category)}
              onValueChange={() => toggleNewsCategory(category)}
              trackColor={{ false: COLORS.BORDER, true: COLORS.PRIMARY }}
              thumbColor={state.settings.newsCategories.includes(category) ? COLORS.PRIMARY : '#f4f3f4'}
            />
          </View>
        ))}
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.infoText}>
          News articles are filtered based on current weather conditions:
        </Text>
        <View style={styles.infoItem}>
          <Text style={styles.infoBullet}>•</Text>
          <Text style={styles.infoText}>
            <Text style={styles.infoHighlight}>Cold</Text> (below 10°C): Depressing news
          </Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoBullet}>•</Text>
          <Text style={styles.infoText}>
            <Text style={styles.infoHighlight}>Hot</Text> (above 25°C): Fear-based news
          </Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoBullet}>•</Text>
          <Text style={styles.infoText}>
            <Text style={styles.infoHighlight}>Moderate</Text> (10-25°C): Positive news
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
    padding: 20,
  },
  section: {
    backgroundColor: COLORS.CARD,
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.TEXT,
    marginBottom: 15,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: 15,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  switchLabel: {
    fontSize: 16,
    color: COLORS.TEXT,
    fontWeight: '500',
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER,
  },
  categoryText: {
    fontSize: 16,
    color: COLORS.TEXT,
    fontWeight: '500',
  },
  infoSection: {
    backgroundColor: COLORS.CARD,
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 14,
    color: COLORS.TEXT,
    lineHeight: 20,
    marginBottom: 8,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  infoBullet: {
    fontSize: 14,
    color: COLORS.PRIMARY,
    marginRight: 8,
    fontWeight: 'bold',
  },
  infoHighlight: {
    fontWeight: 'bold',
    color: COLORS.PRIMARY,
  },
});