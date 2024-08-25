import axios from 'axios';
import type { Express } from 'express';

import { KOL_BASE_URL } from '../constants';
import { assertDefinedOrBadRequest, createKolHeaders, extractHeaders } from '../utils';

export function setupSkill(app: Express): void {
  app.post('/skill', async (req, res) => {
    const { cookies, pwd } = extractHeaders(req);
    assertDefinedOrBadRequest(cookies, res);
    assertDefinedOrBadRequest(pwd, res);

    const skillId = req.body.skillId;
    const targetPlayer = req.body.targetPlayer;
    const quantity = req.body.quantity;
      
    const headers = createKolHeaders(cookies);

    try {
      const url = new URL(`${KOL_BASE_URL}/runskillz.php`);
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
  
      res.send(response.data);
      res.end();
    } catch {
      res.status(500);
      res.end();
    }
  });
}
