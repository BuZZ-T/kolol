import axios, { AxiosError } from 'axios';
import type { Express } from 'express';

import { KOL_BASE_URL } from './constants';
import { createKolHeaders, extractHeaders } from './utils';

/**
 * /api.php?what=status&for=kolol
 */
async function getApiStatus(cookies: string): Promise<unknown | null> {
  const headers = createKolHeaders(cookies);

  try {
    const apiStatus = await axios.get(`${KOL_BASE_URL}/api.php?what=status&for=kolol`, {
      headers,
      withCredentials: true,
    });

    return apiStatus.data;
  } catch(error) {
    const axiosError = error as AxiosError;

    console.log('error');

    if (axiosError.response?.status === 302) {
      if (axiosError.response.headers['location'] === 'login.php?notloggedin=1') {
        // TOOD: handle re-login
        console.log('not loggedin');
      }
    }
  }

  return null;
}

/**
 * /actionbar.php?...
 */
async function getActionBar(cookies: string, pwd: string): Promise<unknown | null> {
  const headers = createKolHeaders(cookies);
  
  try {
    const response = await axios.get(`${KOL_BASE_URL}/actionbar.php?action=fetch&d=${Date.now()}&pwd=${pwd}`, {
      headers,
      withCredentials: true,
    });

    return response.data;
  } catch(error) {
    const axiosError = error as AxiosError;

    console.log('error');

    if (axiosError.response?.status === 302) {
      if (axiosError.response.headers['location'] === 'login.php?notloggedin=1') {
        // TOOD: handle re-login
        console.log('not loggedin');
      }
    }
  }

  return null;
}

async function getItem(itemId: string, cookies: string): Promise<unknown | null> {
  const headers = createKolHeaders(cookies);

  try {
    const response = await axios.get(`${KOL_BASE_URL}/api.php?what=item&id=${itemId}&for=kolol`, {
      headers,
      withCredentials: true,
    });

    return response.data;
  } catch(error) {
    const axiosError = error as AxiosError;

    console.log('error');

    if (axiosError.response?.status === 302) {
      if (axiosError.response.headers['location'] === 'login.php?notloggedin=1') {
        // TOOD: handle re-login
        console.log('not loggedin');
      }
    }
  }

  return null;

}

export function setupApi(app: Express): void {

  app.get('/api/status', async (req, res) => {
    const { cookies } = extractHeaders(req);

    const apiStatus = await getApiStatus(cookies as string);

    if (apiStatus) {
      res.send(apiStatus);
      res.end();

      return;
    }

    res.status(500);
    res.end();
  });

  app.get('/api/actionbar', async (req, res) => {
    const { cookies, pwd } = extractHeaders(req);

    const actionBar = await getActionBar(cookies as string, pwd as string);

    if (actionBar) {
      res.send(actionBar);
      res.end();

      return;
    }

    res.status(500);
    res.end();
  });

  app.get('/api/item', async (req, res) => {
    const { cookies, pwd } = extractHeaders(req);
    const itemId = req.query['itemId'];

    if (!cookies || !pwd || !itemId) {
      res.status(400).send({ error: 'missing-parameters' });
      res.end();

      return;
    }

    const item = await getItem(itemId as string, cookies);

    if (item) {
      res.send(item);
      res.end();

      return;
    }

    res.status(500);
    res.end();
  });
}
