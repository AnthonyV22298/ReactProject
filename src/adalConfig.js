import { AuthenticationContext, adalFetch, withAdalLogin } from 'react-adal';

export const adalConfig = {
  tenant: 'sstack4.onmicrosoft.com',
  clientId: '7930dea8-69e6-42d3-8ed5-9ad033a6ef5e',
  endpoints: {
    api: 'https://sstack4.crm.dynamics.com',
  },
  cacheLocation: 'localStorage',
};

export const authContext = new AuthenticationContext(adalConfig);

export const adalApiFetch = (fetch, url, options) =>
  adalFetch(authContext, adalConfig.endpoints.api, fetch, url, options);

export const withAdalLoginApi = withAdalLogin(authContext, adalConfig.endpoints.api);
console.log(authContext);