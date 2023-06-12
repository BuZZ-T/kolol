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

/**
 * Fetches a page described by "path" (without leading slash).
 */
export async function fetchPage(path: string, cookies: string | string[]): Promise<{status: number, body: unknown, error?: unknown}> {

  const headers = new AxiosHeaders();
  headers.set('referer', 'https://www.kingdomofloathing.com/game.php');
  headers.set('cookie', cookies);
  headers.set('user-agent', USER_AGENT);
  headers.set('authority', 'www.kingdomofloathing.com');

  try {
    const response = await axios.get(`https://www.kingdomofloathing.com/${path}`, { 
      headers,
      maxRedirects: 0,
      responseType: 'text',
      withCredentials: true,
    });

    return { body: response.data, status: response.status };
  } catch(error) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status === 302) {
      const location = axiosError.response.headers['location'];
            
      if (location === 'login.php?notloggedin=1' || location === 'login.php?invalid=1') {
        // TOOD: handle re-login
        console.log('TODO: handle re-login');
      } else if (location === 'main.php') {
        console.log('redirect to main.php');
        // load main.php, then reload requested page
        /* const main = */ await fetchPage('main.php', cookies);
        console.log('loading main done: '); //, main);
        await fetchPage(path, cookies);
      } else {
        console.log('redirect to:', axiosError.response.headers['location']);
        // return { body: null, status: axiosError.response.statu}
      }
    }

    return { body: null, status: axiosError.response?.status ?? 500 };
  }
}

type DoActionParams = {
  cookies: string;
  skillId: string;
  targetPlayer: string;
  pwd: string;
  quantity: string;
}

export async function doAction({ cookies, quantity, pwd, skillId, targetPlayer }: DoActionParams): Promise<string> {
  const headers = new AxiosHeaders()
    .set('referer', 'https://www.kingdomofloathing.com/skillz.php')
    .set('cookie', cookies)
    .set('user-agent', USER_AGENT)
    .set('authority', 'www.kingdomofloathing.com');

  try {

    const url = new URL('https://www.kingdomofloathing.com/runskillz.php');
    url.searchParams.set('action', 'Skillz');
    url.searchParams.set('whichskill', skillId);
    url.searchParams.set('targetplayer', targetPlayer);
    url.searchParams.set('pwd', pwd);
    url.searchParams.set('quantity', quantity);
    url.searchParams.set('ajax', '1');

    const response = await axios.get(url.toString(), {
      headers,
      maxRedirects: 0,
      responseType: 'text',
      withCredentials: true,
    });

    return response.data;
  } catch {
    return '';
  }
}

type DoUseItemParams = {
  cookies: string;
  itemId: string;
  pwd: string;
  which: string;
}

export async function doUseItem({ cookies, which, pwd, itemId }: DoUseItemParams): Promise<string> {
  const headers = new AxiosHeaders()
    .set('referer', 'https://www.kingdomofloathing.com/inventory.php')
    .set('cookie', cookies)
    .set('user-agent', USER_AGENT)
    .set('authority', 'www.kingdomofloathing.com');

  try {
    const url = new URL('https://www.kingdomofloathing.com/inv_eat.php');
    url.searchParams.set('ajax', '1');
    url.searchParams.set('pwd', pwd);
    url.searchParams.set('which', which);
    url.searchParams.set('whichitem', itemId);

    const response = await axios.get(url.toString(), {
      headers,
      maxRedirects: 0,
      responseType: 'text',
      withCredentials: true,
    });

    return response.data;
  } catch {
    return '';
  }
}

type DoUseEquipParams = {
  cookies: string;
  itemId: string;
  pwd: string;
  which: string;
}

export async function doUseEquip({ cookies, which, pwd, itemId }: DoUseEquipParams): Promise<string> {
  const headers = new AxiosHeaders()
    .set('referer', 'https://www.kingdomofloathing.com/inventory.php')
    .set('cookie', cookies)
    .set('user-agent', USER_AGENT)
    .set('authority', 'www.kingdomofloathing.com');

  try {
    const url = new URL('https://www.kingdomofloathing.com/inv_equip.php');
    url.searchParams.set('action', 'equip');
    url.searchParams.set('ajax', '1');
    url.searchParams.set('pwd', pwd);
    url.searchParams.set('which', which);
    url.searchParams.set('whichitem', itemId);

    const response = await axios.get(url.toString(), {
      headers,
      maxRedirects: 0,
      responseType: 'text',
      withCredentials: true,
    });

    return response.data;
  } catch {
    return '';
  }
}
