import { fetchWeatherApi } from 'openmeteo';

export const getWeatherData = async (latitude: string, longitude: string) => {
  const params = {
    latitude,
    longitude,
    current: ['temperature_2m', 'weather_code'],
    daily: ['temperature_2m_max', 'temperature_2m_min'],
  };

  const url: string = 'https://api.open-meteo.com/v1/forecast';
  const responses = await fetchWeatherApi(url, params);

  // Process first location. Add a for-loop for multiple locations or weather models
  const response = responses[0];

  if (!response) {
    throw new Error('No weather data found for the provided coordinates.');
  }

  // Attributes for timezone and location
  const current = response.current()!;
  const daily = response.daily()!;

  if (!current || !daily) {
    throw new Error('Current or daily weather data is missing.');
  }

  const temperature: any | null = current.variables(0);
  const weatherCode: any | null = current.variables(1);
  const maxTemperature: any | null = daily.variables(0);
  const minTemperature: any | null = daily.variables(1);

  // Check if variables are null
  if (!temperature || !weatherCode || !maxTemperature || !minTemperature) {
    throw new Error('One or more weather variables are missing.');
  }

  return {
    current: {
      temperature: temperature.value(),
      weatherCode: weatherCode.value(),
    },
    daily: {
      maxTemperature: maxTemperature.valuesArray()[0],
      minTemperature: minTemperature.valuesArray()[0],
    },
  };
};
