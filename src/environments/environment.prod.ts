export const SERVER_URL = 'http://67.205.157.222';

export const environment = {
  production: true,
  socketIoConfig: {
    url: `${SERVER_URL}:8081`,
    options: {}
  }
};

export const BASE_URL = `${SERVER_URL}:8080`;
export const BASE_URL_GRAPHQL = `${BASE_URL}/api`;
export const MAPBOX_TOKEN = 'pk.eyJ1IjoiZGlvbmltIiwiYSI6ImNqejA0Mm54OTA0MHkzb3Fpemo5cnhmYWcifQ.gbYcjV1OcISZp1Ym1xw8pw';
export const MAP_STYLE = 'mapbox://styles/dionim/cjzwtgft014k41csdy9xmjcyq';
export const MAPBOX_SERVICE_BASE_URL = 'https://api.mapbox.com/';
