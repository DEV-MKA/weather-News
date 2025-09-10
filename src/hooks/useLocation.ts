import { useState, useEffect } from 'react';
import { PermissionsAndroid, Platform, Alert } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

interface Location {
  latitude: number;
  longitude: number;
  error: string | null;
  loading: boolean;
}

export const useLocation = () => {
  const [location, setLocation] = useState<Location>({
    latitude: 0,
    longitude: 0,
    error: null,
    loading: true,
  });

  useEffect(() => {
    initLocation();
  }, []);

  const initLocation = async () => {
    try {
      if (Platform.OS === 'android') {
        await requestAndroidLocationPermission();
      } else {
        getCurrentLocation();
      }
    } catch (error) {
      setLocation(prev => ({
        ...prev,
        error: 'Failed to initialize location',
        loading: false,
      }));
    }
  };

  const requestAndroidLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location to show weather data.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getCurrentLocation();
      } else {
        setLocation(prev => ({
          ...prev,
          error: 'Location permission denied',
          loading: false,
        }));
      }
    } catch (error) {
      setLocation(prev => ({
        ...prev,
        error: 'Permission request failed',
        loading: false,
      }));
    }
  };

  const getCurrentLocation = () => {
    setLocation(prev => ({ ...prev, loading: true }));

    Geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
          loading: false,
        });
      },
      (error) => {
        setLocation(prev => ({
          ...prev,
          error: error.message || 'Unable to get location',
          loading: false,
        }));
      },
      { 
        enableHighAccuracy: false, 
        timeout: 10000, 
        maximumAge: 300000 
      }
    );
  };

  return location;
};