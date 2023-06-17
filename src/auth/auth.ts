import { Cookies } from 'react-cookie';

export const getTokenInCookies = () => {
    const cookies = new Cookies();
    const COOKIE_KEY = "accessToken";

    const token = cookies.get(COOKIE_KEY);

    return token === undefined ? "anonymous" : token
}