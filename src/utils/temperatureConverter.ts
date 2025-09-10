export const convertTemperature = (temp: number, unit: 'celsius' | 'fahrenheit'): number => {
  if (unit === 'fahrenheit') {
    return (temp * 9/5) + 32;
  }
  return temp;
};

export const getTemperatureSymbol = (unit: 'celsius' | 'fahrenheit'): string => {
  return unit === 'celsius' ? '°C' : '°F';
};