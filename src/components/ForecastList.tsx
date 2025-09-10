

import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { ForecastData } from '../types';
import { useApp } from '../context/AppContext';
import { convertTemperature, getTemperatureSymbol } from '../utils/temperatureConverter';
import { COLORS } from '../utils/constants';

interface ForecastListProps {
  forecast: ForecastData[];
}

export const ForecastList: React.FC<ForecastListProps> = ({ forecast }) => {
  const { state } = useApp();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const renderForecastItem = ({ item }: { item: ForecastData }) => {
    const displayTemp = convertTemperature(item.temp, state.settings.temperatureUnit);
    const symbol = getTemperatureSymbol(state.settings.temperatureUnit);

    return (
      <View style={styles.forecastItem}>
        <Text style={styles.date}>{formatDate(item.date)}</Text>
        <Image
          source={{ uri: `https://openweathermap.org/img/wn/${item.icon}@2x.png` }}
          style={styles.icon}
        />
        <View style={styles.temperatureContainer}>
          <Text style={styles.temperature}>{Math.round(displayTemp)}</Text>
          <Text style={styles.temperatureSymbol}>{symbol}</Text>
        </View>
        <Text style={styles.description} numberOfLines={1}>
          {item.description}
        </Text>
        <View style={styles.tempRange}>
          <Text style={styles.tempMin}>
            {Math.round(convertTemperature(item.min_temp, state.settings.temperatureUnit))}{symbol}
          </Text>
          <Text style={styles.tempSeparator}>•</Text>
          <Text style={styles.tempMax}>
            {Math.round(convertTemperature(item.max_temp, state.settings.temperatureUnit))}{symbol}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>5-Day Forecast</Text>
      <FlatList
        data={forecast}
        renderItem={renderForecastItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    padding: 20,
    backgroundColor: COLORS.CARD,
    borderRadius: 20,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 20,
    color: COLORS.TEXT,
    letterSpacing: 0.5,
  },
  listContent: {
    paddingHorizontal: 8,
  },
  forecastItem: {
    alignItems: 'center',
    marginHorizontal: 12,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    minWidth: 140,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  date: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 12,
    color: COLORS.TEXT,
    textAlign: 'center',
  },
  icon: {
    width: 60,
    height: 60,
    marginVertical: 8,
  },
  temperatureContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  temperature: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.PRIMARY,
  },
  temperatureSymbol: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.TEXT_SECONDARY,
    marginLeft: 2,
    marginTop: 2,
  },
  description: {
    fontSize: 13,
    textAlign: 'center',
    textTransform: 'capitalize',
    color: COLORS.TEXT_SECONDARY,
    fontWeight: '500',
    marginBottom: 12,
    maxWidth: 100,
  },
  tempRange: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EAECEF',
  },
  tempMin: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
  tempMax: {
    fontSize: 12,
    fontWeight: '600',
    color: '#EF4444',
  },
  tempSeparator: {
    fontSize: 12,
    fontWeight: '600',
    color: '#D1D5DB',
    marginHorizontal: 6,
  },
});