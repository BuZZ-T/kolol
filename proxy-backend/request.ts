import axios, { AxiosError, AxiosHeaders } from 'axios';
import FormData from 'form-data';

import { USER_AGENT } from './constants';

export async function doLogin(name: string, password: string): Promise<string[] | null> {

  const formData = new FormData();
  formData.append('loggingin', 'Yup.');
  formData.append('promo', '');
  formData.append('mrstore', '');
  formData.append('secure', '0');
  formData.append('submitbutton', 'Log In');

  formData.append('loginname', name);
  formData.append('password', password);

  const headers = new AxiosHeaders();
  headers.set('user-agent', USER_AGENT);

  try {
    await axios.post('https://www.kingdomofloathing.com/login.php', formData, { headers, maxRedirects: 0 });
  } catch(error) {
    // it should fail, as it wants to redirect and we don't want it to
    if ((error as AxiosError).response?.status === 302) {
      // console.log('redirect');
      const cookies = (error as AxiosError).response?.headers['set-cookie'] as string[];

      if (cookies) {
        return cookies;
      }

      // const sessionCookie = cookies.find(cookie => cookie.startsWith('PHPSESSID'));

      // const sessionId = sessionIdCookie?.match(/PHPSESSID=(.*);.*/)?.[1];

      // if (sessionCookie) {
      //     res.send(sessionCookie);
      //     res.end();
                
      //     return;
      // }
    }
  }

  return null;
} 
