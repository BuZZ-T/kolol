import cors from 'cors';
import express from 'express';

import { setupApi } from './api';
import { setupItem } from './item';
import { setupParse } from './parse';
import { doAction, doAttack, doChoice, doLogin, fetchByPath } from './request';
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

app.post('/skill', async (req, res) => {
  const { cookies, pwd } = extractHeaders(req);

  if (!cookies || !pwd) {
    res.status(400).send({ error: 'missing-parameters' });
    res.end();

    return;
  }
  
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

app.post('/adventure/attack', async (req, res) => {
  const { cookies } = extractHeaders(req);

  if (!cookies) {
    res.status(400).send({ error: 'missing-parameters' });
    res.end();

    return;
  }

  const action = req.body.action;
  const skillId = req.body.skill as string;
  const itemId = req.body.itemId as string;

  const responseHtml = await doAttack({ action, cookies, itemId, skillId });
  res.send(responseHtml);
  res.end();
});

app.post('/choice', async (req, res) => {
  const { cookies, pwd } = extractHeaders(req);

  if (!cookies || !pwd) {
    res.status(400).send({ error: 'missing-parameters' });
    res.end();

    return;
  }

  const which = req.body.which;
  const option = req.body.option;

  console.log('choice', which, option, pwd);

  const responseHtml = await doChoice({ cookies, option, pwd, which });
  res.send(responseHtml);
  res.end();
});

/* Setup */

app.listen(port, () => {
  console.log('listen HTTP on port', port);
});
