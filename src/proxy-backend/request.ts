import type { AxiosError } from 'axios';
import axios, { AxiosHeaders } from 'axios';
import FormData from 'form-data';

import { KOL_BASE_URL, USER_AGENT } from './constants';
import { createKolHeaders } from './utils';

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
    const response = await axios.post('https://www.kingdomofloathing.com/login.php', formData, { headers, maxRedirects: 0 });
    if (response.data.includes('Too many login failures')) {
      return Promise.reject('flood');
    }
    return Promise.reject('auth');
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

type SharedFetchPageParams = {
  action?: string;
  followRedirectToMain?: boolean;
  cookies: string | string[];
  redirectedTo?: string;
}

type FetchPageParamsByPath = {
  path: string;
} & SharedFetchPageParams;

type FetchPageParamsByURL = {
  url: URL;
} & SharedFetchPageParams;

type FetchPageResult = {
  body: unknown;
  error?: unknown;
  redirectedTo?: string;
  status: number;
}

export async function fetchByPath({ path, ...rest }: FetchPageParamsByPath): Promise<FetchPageResult> {
  return fetchPage({ ...rest, url: new URL(path, KOL_BASE_URL) });
}

/**
 * Fetches a page described by "path" (without leading slash).
 */
export async function fetchPage({ action, followRedirectToMain = true, cookies, redirectedTo, url }: FetchPageParamsByURL): Promise<FetchPageResult> {
  const headers = createKolHeaders(cookies);

  if (action) {
    url.searchParams.set('action', action);
  }
  
  try {
    const response = await axios.get(url.toString(), { 
      headers,
      maxRedirects: 0,
      responseType: 'text',
      withCredentials: true,
    });

    return { body: response.data, redirectedTo, status: response.status };
  } catch(error) {
    const axiosError = error as AxiosError;

    // TODO: allow redirect to place.php?whichplace=...
    if (axiosError.response?.status === 302) {
      
      const location = axiosError.response.headers['location'];
      console.log('redirect', url.pathname, ' -> ', location);
            
      if (location === 'login.php?notloggedin=1' || location === 'login.php?invalid=1') {
        return { body: null, redirectedTo: 'login', status: 200 };
      } else if (location === 'main.php') {
        // console.log('redirect to main.php');
        if (followRedirectToMain) {
          // load main.php, then reload requested page
          await fetchByPath({ cookies, path: 'main.php' });
          return fetchPage({ action, cookies, followRedirectToMain: false, url });
        }
        return { body: null, error: 'interrupted redirect loop', status: 500 };
      } else if(location.startsWith('fight.php') || location.startsWith('choice.php')) {
        // console.log(`allow redirect to ${location}`);
        return fetchByPath({ 
          action, 
          cookies,
          path: location,
          redirectedTo: !url.pathname.startsWith('adventure.php') ? 'adventure' : undefined,
        });
      } else {
        console.log('(error) redirect to:', location);
        // return { body: null, status: axiosError.response.statu}
      }
    }

    return { body: null, status: axiosError.response?.status ?? 500 };
  }
}

type DoUseEquipParams = {
  cookies: string;
  isOffhand: boolean;
  itemId: string;
  pwd: string;
  slot: string | undefined;
  which: string;
}

export async function doUseEquip({ cookies, isOffhand, which, pwd, slot, itemId }: DoUseEquipParams): Promise<string> {
  const headers = createKolHeaders(cookies);

  try {
    const url = new URL('https://www.kingdomofloathing.com/inv_equip.php');
    url.searchParams.set('action', isOffhand ? 'dualwield' : 'equip');
    url.searchParams.set('ajax', '1');
    url.searchParams.set('pwd', pwd);
    url.searchParams.set('which', which);
    url.searchParams.set('whichitem', itemId);
    if (slot) {
      url.searchParams.set('slot', slot);
    }

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

