import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const getCookie = (key: string) => {
  const token = cookies.get(key);

  return token;
}

export const setCookie = (key: string, token: string) => {
  const option = {
    maxAge: 60 * 60 * 12,
  }

  cookies.set(key, token, option);
}