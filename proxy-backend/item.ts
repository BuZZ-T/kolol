import type { Express } from 'express';

import { doUseEquip, fetchPage } from './request';
import { extractHeaders } from './utils';

export function setupItem(app: Express): void {

  app.post('/item/buy', async (req, res) => {
    const { cookies, pwd } = extractHeaders(req);

    if (!cookies || !pwd) {
      res.status(400).send({ error: 'missing-parameters' });
      res.end();
            
      return;
    }

    const shop = req.body['shop'];
    const action = 'buyitem';
    const quantity = req.body['quantity'];
    const row = req.body['row'];

    const path = `shop.php?whichshop=${shop}&action=${action}&quantity=${quantity}&whichrow=${row}&pwd=${pwd}`;

    console.log('shop path: ', path);
    
    const { body, redirectedTo, status } = await fetchPage({ cookies, path });
    
    if (redirectedTo) {
      res.set('X-Redirected-To', redirectedTo);
      res.end();
      
      return;
    }

    if (status > 300) {
      //TODO
    }

    res.send(body);
    res.end();
  });

  app.post('/item/equip', async (req, res) => {
    const { cookies, pwd } = extractHeaders(req);
  
    if (!cookies || !pwd) {
      res.status(400).send({ error: 'missing-parameters' });
      res.end();
  
      return;
    }
    
    const itemId = req.body.itemId;
    const which = req.body.which;
    const isOffhand = req.body.offhand === 'true';
  
    const responseHtml = await doUseEquip({
      cookies,
      isOffhand,
      itemId,
      pwd,
      which,
    });
    res.send(responseHtml);
    res.end();
  });

  app.post('/item/unequip', async (req, res) => {
    const cookies = req.headers['x-session'];
    const pwd = req.headers['x-pwd'];

    if (!cookies || !pwd) {
      res.status(400).send({ error: 'missing-parameters' });
      res.end();
            
      return;
    }

    const type = req.body['section'];

    const path = `inv_equip.php?pwd=${pwd}&which=2&action=unequip&type=${type}`;

    await fetchPage({ cookies, path });

    const invPath = 'inventory.php?&which=2&action=message';
    const { body } = await fetchPage({ cookies, path: invPath });

    // TODO: parse result, parse inventory

    res.send(body);
    res.end();
  });
}
