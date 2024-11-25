import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://api.kriate.co.in:8346',
  realm: 'nishkaiv-bank',
  clientId: 'sector-1',
});

let initialized = false;

export const initializeKeycloak = () => {
  if (!initialized) {
    initialized = true; 
    return keycloak.init({ onLoad: 'login-required' });
  }
  return Promise.resolve(keycloak.authenticated);
};


export default keycloak;
