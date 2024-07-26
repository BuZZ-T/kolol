import { AxiosHeaders, AxiosRequestHeaders } from 'axios';
import type { Request } from 'express';

import { USER_AGENT } from './constants';

/**
 * TODO: rename to getKolHeaders
 */
export function createKolHeaders(cookies: string | string[]): AxiosRequestHeaders {
  const headers = new AxiosHeaders();
  headers.set('referer', 'https://www.kingdomofloathing.com/game.php');
  headers.set('cookie', cookies);
  headers.set('user-agent', USER_AGENT);
  headers.set('authority', 'www.kingdomofloathing.com');

  return headers;
}

/**
 * TODO: rename to extractDefaultHeaders?
 */
export function extractHeaders(req: Request): {cookies: string | undefined, pwd: string | undefined} {
  const pwd = req.headers['x-pwd'] as string | undefined;
  const cookies = req.headers['x-session'] as string | undefined;

  return { cookies, pwd };
}
