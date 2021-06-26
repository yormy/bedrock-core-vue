import axios from 'axios';
import {data} from '@config/config_js.json';
import {
  getAccessTokenAdmin,
  getAccessTokenUser,
  getRefreshTokenAdmin,
  getRefreshTokenUser,
  storeTokens,
} from './loginhelper';

import TunnelEncryption from './tunnel_encryption';

const axiosApi = axios.create({
  baseURL: '',
});

function getRefreshTokenUrl(error) {
  const PROVIDER_ADMINS = 101;
  // const PROVIDER_USERS = 102;


  const responseData = error.response.data;
  if (PROVIDER_ADMINS === responseData.code) {
    const defaultUrl = data.auth.TOKEN_REFRESH_ENDPOINT_ADMINS;
    const newUrl = defaultUrl.replace('/admin/', `/admin${data.auth.admin_route_postfix}/`);
    return newUrl;
  }
  return data.auth.TOKEN_REFRESH_ENDPOINT_USERS;
}

function isAdminRoute(config) {
  const {url} = config;

  let find = '/api/v[0-9]/admin';
  find += data.auth.admin_route_postfix;
  let regex = new RegExp(find, 'g');

  //  const regex = /\/api\/v[0-9]\/admin\//g;
  if (url.match(regex)) {
    return true;
  }

  find = '/admin';
  find += data.auth.admin_route_postfix;
  regex = new RegExp(find, 'g');

  //  const regex = /\/api\/v[0-9]\/admin\//g;
  if (url.match(regex)) {
    return true;
  }

  return false;
}

function getAccessToken(config) {
  if (isAdminRoute(config)) {
    return getAccessTokenAdmin();
  }
  return getAccessTokenUser();
}

function getRefreshToken(error) {
  const {config} = error.response;
  if (isAdminRoute(config)) {
    return getRefreshTokenAdmin();
  }
  return getRefreshTokenUser();
}

function doStoreTokens(config, responseData) {
  let loginas = 'USER';
  if (isAdminRoute(config)) {
    loginas = 'ADMIN';
  }
  storeTokens(responseData, loginas);
}

function redirectIfNeeded(error) {
  // redirect to resolve page : ie in case the terms were not accepted and this is a post call
  if (
    error.response &&
    error.response.data &&
    error.response.data.data &&
    error.response.data.redirect_to
  ) {
    let redirectUrl = error.response.data.redirect_to;

    if (error.response.data.redirect_from) {
      redirectUrl += `?intendedUrl=${error.response.data.redirect_from}`;
    }

    window.location.href = redirectUrl;
  }

}

function createChecksum(encryption, postedData) {
  if (postedData) {
    const data = JSON.stringify(postedData);
    const checksum = data.replace(/[^a-z0-9]/g, '');

    return encryption.buildPostValue(checksum);
  }
  return '';
}

axiosApi.interceptors.request.use((config) => {
  const accessToken = getAccessToken(config);
  axiosApi.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

  const authorizedConfig = {...config};

  const encryption = new TunnelEncryption(data.auth.tunnel_encryption, data.auth.tunnel_encryption_secret);

  if (authorizedConfig.data) {
    if (authorizedConfig.data.loginname) {
      authorizedConfig.data.loginname = encryption.buildPostValueHashed(
        authorizedConfig.data.loginname,
      );
    }

    if (authorizedConfig.data.password) {
      authorizedConfig.data.password = encryption.buildPostValueHashed(
        authorizedConfig.data.password,
      );
    }

    if (authorizedConfig.data.currentPassword) {
      authorizedConfig.data.currentPassword = encryption.buildPostValueHashed(
        authorizedConfig.data.currentPassword,
      );
    }

    if (authorizedConfig.data.newPassword) {
      authorizedConfig.data.newPassword = encryption.buildPostValue(
        authorizedConfig.data.newPassword,
      );
    }

    authorizedConfig.data.locale = localStorage.getItem('locale');

    authorizedConfig.headers.common['X-Checksum'] = createChecksum(encryption, authorizedConfig.data);
  }

  // if (authorizedConfig.data && authorizedConfig.data.xid) {
  //   authorizedConfig.data.xid = encryption.buildPostValue(authorizedConfig.data.xid);
  //   // delete authorizedConfig.data.xid;
  // }

  authorizedConfig.headers.Authorization = `Bearer ${accessToken}`;
  return authorizedConfig;
});

axiosApi.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    redirectIfNeeded(error);

    return Promise.reject(error);
    //
    // console.log('ax', error);
    // /*eslint-disable */
    //     if (error.response.status === 401 && originalRequest.data && !originalRequest._retry) {
    //         const request = JSON.parse(originalRequest.data);
    //
    //
    //       return Promise.reject(error);
    //
    //
    //
    //         if (request.skipRetry) {
    //             return Promise.reject(error);
    //         }
    //         originalRequest._retry = true;
    //       /* eslint-enable */
    //   const refreshTokenUrl = getRefreshTokenUrl(error);
    //   const refreshToken = `${getRefreshToken(error)}`;
    //
    //   return axiosApi
    //     .post(refreshTokenUrl, {
    //       refresh_token: refreshToken,
    //     })
    //     .then((response) => {
    //       if (response.status === 200) {
    //         // const encryption = new TunnelEncryption(
    //         //   data.auth.TUNNEL_ENCRYPTION,
    //         //   data.auth.TUNNEL_ENCRYPTION_SECRET,
    //         // );
    //
    //         doStoreTokens(originalRequest, response.data.data);
    //         const newAccessToken = getAccessToken(originalRequest);
    //         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
    //         return axiosApi(originalRequest);
    //       }
    //       return Promise.reject(error);
    //     });
    // }
    // // return Error object with Promise
    // return Promise.reject(error);
  },
);
// @ts-ignore
export default axiosApi;
