import type { Express } from 'express';

import { KOL_BASE_URL } from './constants';
import { doUseEquip, fetchPage } from './request';
import { extractHeaders } from './utils';

type UseItemParams = {
  cookies: string | string[];
  itemId: string;
  pwd: string;
  quantity?: string;
  verb: string;
  which: string;
}

function getVerbForAction(action: string, quantity: string | undefined): string | undefined {
  switch (action) {
  case 'drink':
    return 'inv_booze';
  case 'eat':
    return 'inv_eat';
  case 'use':
    if (quantity && parseInt(quantity, 10) > 1) {
      return 'multiuse';
    }
    return 'inv_use';
  default:
    return undefined;
  }
}

async function useItem({ cookies, itemId, pwd, quantity, verb, which }: UseItemParams): Promise<unknown> {
  const url = new URL(`${verb}.php`, KOL_BASE_URL);
  url.searchParams.set('ajax', '1');
  url.searchParams.set('pwd', pwd);
  url.searchParams.set('which', which);
  url.searchParams.set('whichitem', itemId);
  if (quantity) {
    url.searchParams.set('quantity', quantity);
    if (verb === 'multiuse') {
      url.searchParams.set('action', 'useitem');
    }
  }

  const { body/* , redirectedTo, status */ } = await fetchPage({ cookies, url });
  return body;
}

export function setupItem(app: Express): void {
  app.post('/item/use', async (req, res) => {
    const { cookies, pwd } = extractHeaders(req);
  
    if (!cookies || !pwd) {
      res.status(400).send({ error: 'missing-parameters' });
      res.end();
  
      return;
    }
    
    const action = req.body.action;
    const itemId = req.body.itemId;
    const which = req.body.which;
    const quantity = req.body.quantity;

    const verb = getVerbForAction(action, quantity);

    if (!verb) {
      res.status(400).send({ error: 'invalid-action' });
      res.end();
  
      return;
    }

    console.log(action, itemId, which, quantity);

    const body = await useItem({ cookies, itemId, pwd, quantity, verb, which });
  
    res.send(body);
    res.end();
  });

  // app.post('/item/drink', async (req, res) => {
  //   const { cookies, pwd } = extractHeaders(req);
  
  //   if (!cookies || !pwd) {
  //     res.status(400).send({ error: 'missing-parameters' });
  //     res.end();
  
  //     return;
  //   }
    
  //   const itemId = req.body.itemId;
  //   const which = req.body.which;
  //   const quantity = req.body.quantity;

  //   const body = await useItem({ cookies, itemId, pwd, quantity, verb: 'inv_booze', which });
  
  //   res.send(body);
  //   res.end();
  // });

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

    const url = new URL('shop.php', KOL_BASE_URL);
    url.searchParams.set('whichshop', shop);
    url.searchParams.set('action', action);
    url.searchParams.set('quantity', quantity);
    url.searchParams.set('whichrow', row);
    url.searchParams.set('pwd', pwd);

    console.log('shop path: ', url.pathname);
    
    const { body, redirectedTo, status } = await fetchPage({ cookies, url });
    
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
    const { cookies, pwd } = extractHeaders(req);

    if (!cookies || !pwd) {
      res.status(400).send({ error: 'missing-parameters' });
      res.end();
            
      return;
    }

    const type = req.body['section'];

    const url = new URL('inv_equip', KOL_BASE_URL);
    url.searchParams.set('pwd', pwd.toString());
    url.searchParams.set('which', '2');
    url.searchParams.set('action', 'unequip');
    url.searchParams.set('type', type);

    await fetchPage({ cookies, url });

    const invUrl = new URL('inventory.php', KOL_BASE_URL);
    invUrl.searchParams.set('which', '2');
    invUrl.searchParams.set('action', 'message');

    const { body } = await fetchPage({ cookies, url: invUrl });

    // TODO: parse result, parse inventory

    res.send(body);
    res.end();
  });
}
