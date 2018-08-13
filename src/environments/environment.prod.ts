export const environment = {
  production: true,
  WEATHER_API: 'https://api.openweathermap.org/data/2.5',
  WEATHER_API_KEY: '390f49ffd9f3bf1b179bdafb76571fec',
  cityIds: [
    3871336, // Santiago, CL
    3433955, // Buenos Aires, AR
    3936456, // Lima, PE
    3448439, // São Paulo, BR
  ],
  refreshTimeout: 3 * 60000, // 3 minutes
};
