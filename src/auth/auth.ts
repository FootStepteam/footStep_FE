import axios from 'axios';
import { Cookies } from 'react-cookie';

export const getTokenInCookies = () => {
    const cookies = new Cookies();
    const COOKIE_KEY = "accessToken";

    const token = cookies.get(COOKIE_KEY);

    if(token !== undefined) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    }

    return token === undefined ? "anonymous" : token
}