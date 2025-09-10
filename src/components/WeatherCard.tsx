import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { WeatherData } from '../types';
import { useApp } from '../context/AppContext';
import { convertTemperature, getTemperatureSymbol } from '../utils/temperatureConverter';

interface WeatherCardProps {
  weather: WeatherData;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  const { state } = useApp();
  
  const displayTemp = convertTemperature(weather.temp, state.settings.temperatureUnit);
  const feelsLikeTemp = convertTemperature(weather.feels_like, state.settings.temperatureUnit);
  const symbol = getTemperatureSymbol(state.settings.temperatureUnit);

  return (
    <View style={styles.container}>
      <Text style={styles.city}>{weather.city}, {weather.country}</Text>
      
      <View style={styles.weatherMain}>
        <Image
          source={{ uri: `https://openweathermap.org/img/wn/${weather.icon}@4x.png` }}
          style={styles.weatherIcon}
        />
        <View style={styles.temperatureContainer}>
          <Text style={styles.temperature}>{Math.round(displayTemp)}{symbol}</Text>
          <Text style={styles.weatherDescription}>{weather.description}</Text>
        </View>
      </View>

      <View style={styles.weatherDetails}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Feels like</Text>
          <Text style={styles.detailValue}>{Math.round(feelsLikeTemp)}{symbol}</Text>
        </View>
        
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Humidity</Text>
          <Text style={styles.detailValue}>{weather.humidity}%</Text>
        </View>
        
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Pressure</Text>
          <Text style={styles.detailValue}>{weather.pressure}hPa</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    marginTop:20,
    marginBottom: 10,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  city: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  weatherMain: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  weatherIcon: {
    width: 100,
    height: 100,
    marginRight: 15,
  },
  temperatureContainer: {
    alignItems: 'center',
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  weatherDescription: {
    fontSize: 16,
    color: '#666',
    textTransform: 'capitalize',
    marginTop: 5,
  },
  weatherDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 15,
  },
  detailItem: {
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});