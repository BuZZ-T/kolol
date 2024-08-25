import cors from 'cors';
import express from 'express';

import { setupAdventure } from './controller/adventure';
import { setupApi } from './controller/api';
import { setupFamiliar } from './controller/familiar';
import { setupItem } from './controller/item';
import { setupParse } from './controller/parse';
import { setupSkill } from './controller/skill';
import { doLogin, fetchByPath } from './request';
import { extractHeaders } from './utils';

const app = express();

const port = 4100;

app.use(cors({
  exposedHeaders: [ 'X-Redirected-To' ],
}));
app.use(express.urlencoded({ extended: false }));

setupApi(app);
setupParse(app);
setupItem(app);
setupAdventure(app);
setupFamiliar(app);
setupSkill(app);

app.post('/login', async (req, res) => {
  const name = req.body.name;
  const password = req.body.password;

  if (!name || !password) {
    console.log('no input', !!name, !!password);
    res.status(400);
    res.end();

    return;
  }

  try {
    const cookies = await doLogin(name, password);
    if (cookies) {
  
      // const secureCookies = cookies.map(cookie => {
      //   if (cookie.startsWith('PHPSESSID')) {
      //     cookie = cookie + '; SameSite=None; Secure';
      //   }
  
      //   return cookie;
      // });
  
      // res.set('Access-Control-Expose-Headers', '*, set-cookie');
      // res.set('set-cookie', secureCookies);
  
      res.send(cookies);
      res.end();
  
      return;
    }
  } catch(e) {
    if (e === 'flood') {
      res.status(429);
      res.end();
  
      return;
    } else if (e === 'auth') {

      res.status(401);
      res.end();

      return;
    }
    res.status(500);
    res.end();
  }

  res.status(500);
  res.end();
});

app.get('/page', async (req, res) => {
  const { cookies } = extractHeaders(req);
  const page = req.query['page'];
  const action = req.query['action'];

  if (!cookies || !page) {
    res.status(400).send({ error: 'missing-parameters' });
    res.end();

    return;
  }

  const { body, status, redirectedTo } = await fetchByPath({ action: action?.toString(), cookies, path: page.toString() });

  if (redirectedTo) {
    res.set('X-Redirected-To', redirectedTo);
  }

  if (status >= 300) {
    res.status(status);
  } else {
    res.send(body);
  }
  res.end();
});

/* Setup */

app.listen(port, () => {
  console.log('listen HTTP on port', port);
});
