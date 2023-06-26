import { AxiosHeaders, AxiosRequestHeaders } from 'axios';

import { USER_AGENT } from './constants';

export function getHeaders(cookies: string | string[]): AxiosRequestHeaders {
  const headers = new AxiosHeaders();
  headers.set('referer', 'https://www.kingdomofloathing.com/game.php');
  headers.set('cookie', cookies);
  headers.set('user-agent', USER_AGENT);
  headers.set('authority', 'www.kingdomofloathing.com');

  return headers;
}
