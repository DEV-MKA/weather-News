import React, { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { useApp } from '../context/AppContext';
import { useWeather } from '../hooks/useWeather';
import { useNews } from '../hooks/useNews';
import { WeatherCard } from '../components/WeatherCard';
import { ForecastList } from '../components/ForecastList';
import { NewsList } from '../components/NewsList';

export const HomeScreen: React.FC = () => {
  const { state, dispatch } = useApp();
  useWeather();
  useNews();
  const onRefresh = () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    setTimeout(() => {
      dispatch({ type: 'SET_LOADING', payload: false });
    }, 1000);
  };

  if (state.error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{state.error}</Text>
      </View>
    );
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={state.loading}
          onRefresh={onRefresh}
        />
      }
    >
      {state.weather && <WeatherCard weather={state.weather} />}
      {state.forecast.length > 0 && <ForecastList forecast={state.forecast} />}
      {state.news.length > 0 && <NewsList news={state.news} />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
});

