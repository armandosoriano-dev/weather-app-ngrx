// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // WEATHER_API: 'http://localhost:3000', // local server weather-app-mock-backend
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

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
import 'zone.js/dist/zone-error'; // Included with Angular CLI.
