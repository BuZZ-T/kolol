import { Express } from 'express';

import { fetchPage } from './request';

export function setupItem(app: Express): void {

  app.post('/item/buy', async (req, res) => {
    const cookies = req.headers['x-session'];
    const pwd = req.headers['x-pwd'];

    if (!cookies) {
      res.status(400).send({ error: 'missing-parameters' });
      res.end();
            
      return;
    }

    const shop = req.body['shop'];
    const action = 'buyitem';
    const quantity = req.body['quantity'];
    const row = req.body['row'];

    // https://www.kingdomofloathing.com/shop.php?whichshop=bartender&action=buyitem&quantity=1&whichrow=562&pwd=76ab5558d37dfff5e386628789f5e524
    // https://www.kingdomofloathing.com/shop.php?whichshop=bartender&action=buyitem&quantity=1&whichrow=562&pwd=d2cd9f84389ed4327b921107242b95af

    const path = `shop.php?whichshop=${shop}&action=${action}&quantity=${quantity}&whichrow=${row}&pwd=${pwd}`;

    console.log('shop path: ', path);
    
    const { body, error, redirectedTo, status } = await fetchPage({ cookies, path });
    
    console.log('shop body: ', body);
    console.log('shop error: ', error);
    console.log('shop cookies: ', cookies);
    console.log('shop status: ', status);
    
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
}
