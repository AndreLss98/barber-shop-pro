const HOST_IP = '192.168.0.20';

export const environment = {
  production: false,
  socketIoConfig: {
    url: `http://${HOST_IP}:8081`,
    options: {}
  }
};

export const BASE_URL = `http://${HOST_IP}:8080`;
export const BASE_URL_GRAPHQL = `${BASE_URL}/api`;
export const MAPBOX_TOKEN = 'pk.eyJ1IjoiZGlvbmltIiwiYSI6ImNqejA0Mm54OTA0MHkzb3Fpemo5cnhmYWcifQ.gbYcjV1OcISZp1Ym1xw8pw';
export const MAP_STYLE = 'mapbox://styles/dionim/cjzwtgft014k41csdy9xmjcyq';
export const MAPBOX_SERVICE_BASE_URL = 'https://api.mapbox.com/';
