// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const SERVER_URL = 'http://localhost';

export const environment = {
  production: false,
  socketIoConfig: {
    url: `${SERVER_URL}:8081`,
    options: {}
  }
};

export const BASE_URL = `${SERVER_URL}:8080`;
// export const BASE_URL = 'http://67.205.157.222:8080';
export const BASE_URL_GRAPHQL = `${BASE_URL}/api`;
export const MAPBOX_TOKEN = 'pk.eyJ1IjoiZGlvbmltIiwiYSI6ImNqejA0Mm54OTA0MHkzb3Fpemo5cnhmYWcifQ.gbYcjV1OcISZp1Ym1xw8pw';
export const MAP_STYLE = 'mapbox://styles/dionim/cjzwtgft014k41csdy9xmjcyq';
export const MAPBOX_SERVICE_BASE_URL = 'https://api.mapbox.com/';

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
