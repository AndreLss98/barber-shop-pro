export const SERVER_URL = 'http://192.168.0.3';

export const environment = {
  production: false,
  socketIoConfig: {
    url: `${SERVER_URL}:8081`,
    options: {}
  }
};

export const BASE_URL = `${SERVER_URL}:8080`;
export const BASE_URL_GRAPHQL = `${BASE_URL}/api`;
export const MAPBOX_SERVICE_BASE_URL = 'https://api.mapbox.com/';
export const MAP_STYLE = 'mapbox://styles/dionim/cjzwtgft014k41csdy9xmjcyq';
export const MAPBOX_TOKEN = 'pk.eyJ1IjoiZGlvbmltIiwiYSI6ImNqejA0Mm54OTA0MHkzb3Fpemo5cnhmYWcifQ.gbYcjV1OcISZp1Ym1xw8pw';
