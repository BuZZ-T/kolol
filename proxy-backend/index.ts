import cors from 'cors';
import express from 'express';
import { readFileSync } from 'fs';
import https from 'https';

import { setupApi } from './api';
import { doAction, doLogin, doUseEquip, doUseItem, fetchPage } from './request';

const app = express();

const USE_HTTPS = true;

const port = 4100;

app.use(cors());
app.use(express.urlencoded());

setupApi(app);

app.post('/login', async (req, res) => {
  const name = req.body.name;
  const password = req.body.password;

  if (!name || !password) {
    console.log('no input', !!name, !!password);
    res.status(400);
    res.end();

    return;
  }

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

  res.status(500);
  res.end();
});

app.get('/page', async (req, res) => {
  const cookies = req.headers['x-session'];
  const page = req.query['page'];

  if (!cookies || !page) {
    res.status(400).send({ error: 'missing-parameters' });
    res.end();

    return;
  }

  const { status, body } = await fetchPage(page.toString(), cookies);

  if (status >= 300) {
    res.status(status);
  } else {
    res.send(body);
  }
  res.end();
});

app.post('/skill', async (req, res) => {
  const pwd = req.headers['x-pwd'] as string;
  const cookies = req.headers['x-session'] as string;
  
  const skillId = req.body.skillId;
  const targetPlayer = req.body.targetplayer;
  const quantity = req.body.quantity;

  const responseHtml = await doAction({
    cookies,
    pwd,
    quantity,
    skillId,
    targetPlayer,
  });
  res.send(responseHtml);
  res.end();
});

app.post('/item/use', async (req, res) => {
  const pwd = req.headers['x-pwd'] as string;
  const cookies = req.headers['x-session'] as string;
  
  const itemId = req.body.itemId;
  const which = req.body.which;

  const responseHtml = await doUseItem({
    cookies,
    itemId,
    pwd,
    which,
  });
  res.send(responseHtml);
  res.end();
});

app.post('/item/equip', async (req, res) => {
  const pwd = req.headers['x-pwd'] as string;
  const cookies = req.headers['x-session'] as string;
  
  const itemId = req.body.itemId;
  const which = req.body.which;

  const responseHtml = await doUseEquip({
    cookies,
    itemId,
    pwd,
    which,
  });
  res.send(responseHtml);
  res.end();
});

if (USE_HTTPS) {

  https.createServer({
    cert: readFileSync('./ssl/localhost.crt'),
    key: readFileSync('./ssl/localhost.key'),
  }, app).listen(port, () => {
    console.log('listen HTTPS on port', port);
  });
} else {
  app.listen(port, () => {
    console.log('listen HTTP on port', port);
  });
}