import axios from 'axios';
import type { Express } from 'express';

import { KOL_BASE_URL } from '../constants';
import { assertDefinedOrBadRequest, createKolHeaders, extractHeaders } from '../utils';

const FAVORITE = 1;
const UNFAVORITE = 0;

export function setupFamiliar(app: Express): void {
  app.post('/familiar/favorite', async (req, res) => {
    const { cookies, pwd } = extractHeaders(req);
    assertDefinedOrBadRequest(cookies, res);
    const headers = createKolHeaders(cookies);

    const familiarId = req.body.familiarId;

    try {
      const response = await axios.get(`${KOL_BASE_URL}/familiar.php?group=${FAVORITE}&action=fave&famid=${familiarId}&pwd=${pwd}`, {
        headers,
        withCredentials: true,
      });

      res.status(204);
      res.send(response.data);
      res.end();
    } catch (error) {
      res.status(500);
      res.end();
    }
  });

  app.post('/familiar/unfavorite', async (req, res) => {
    const { cookies, pwd } = extractHeaders(req);
    assertDefinedOrBadRequest(cookies, res);
    const headers = createKolHeaders(cookies);

    const familiarId = req.body.familiarId;

    try {
      const response = await axios.get(`${KOL_BASE_URL}/familiar.php?group=${UNFAVORITE}&action=fave&famid=${familiarId}&pwd=${pwd}`, {
        headers,
        withCredentials: true,
      });

      res.status(204);
      res.send(response.data);
      res.end();
    } catch (error) {
      res.status(500);
      res.end();
    }
  });

  app.post('/familiar/take', async (req, res) => {
    const { cookies, pwd } = extractHeaders(req);
    assertDefinedOrBadRequest(cookies, res);
    const headers = createKolHeaders(cookies);

    const familiarId = req.body.familiarId;

    try {
      const response = await axios.get(`${KOL_BASE_URL}/familiar.php?action=newfam&newfam=${familiarId}&pwd=${pwd}`, {
        headers,
        withCredentials: true,
      });

      res.status(204);
      res.send(response.data);
      res.end();
    } catch (error) {
      res.status(500);
      res.end();
    }
  });

  app.post('/familiar/putback', async (req, res) => {
    const { cookies, pwd } = extractHeaders(req);
    assertDefinedOrBadRequest(cookies, res);
    const headers = createKolHeaders(cookies);

    try {
      const response = await axios.get(`${KOL_BASE_URL}/familiar.php?action=putback&pwd=${pwd}`, {
        headers,
        withCredentials: true,
      });

      res.status(204);
      res.send(response.data);
      res.end();
    } catch (error) {
      res.status(500);
      res.end();
    }
  });
}
