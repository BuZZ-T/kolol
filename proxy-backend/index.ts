import cors from 'cors';
import express from 'express';

import { setupApi } from './api';
import { fetchPage } from './fetchPage';
import { doLogin } from './request';

const app = express();

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

app.listen(port);
console.log('list on port', port);
