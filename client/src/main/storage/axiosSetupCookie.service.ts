import { isEmpty, isNil } from 'lodash';

const setDefaultAxios = (token: string | string[]) => {
  if (isNil(token) || isEmpty(token)) {
    return;
  }

  let expires = '';

  const date = new Date();
  date.setTime(date.getTime() + (14 * 24 * 60 * 60 * 1000));
  expires = `; expires=${date.toUTCString()}`;

  document.cookie = `rememberMe=${token || ''}${expires}; path=/`;
};

const AxiosSetupCookieService = {
  setDefaultAxios,
};

export default AxiosSetupCookieService;
