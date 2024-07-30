import axios from 'axios';
import type { Express } from 'express';

import { createKolHeaders, extractHeaders } from '../utils';

type DoAttackParams = {
    action: 'attack' | 'skill' | 'useitem' | 'runaway' | 'macro' | 'steal';
    cookies: string;
    itemId: string | undefined;
    skillId: string | undefined;
    macroId: string | undefined;
}

type DoChoiceParams = {
    cookies: string;
    option: string;
    pwd: string;
    which: string;
}

async function doAttack({ action, cookies, itemId, macroId, skillId }: DoAttackParams): Promise<unknown> {
  const headers = createKolHeaders(cookies);
  
  const formData = new URLSearchParams();
  
  console.log('doAttack', action, skillId, itemId);
  
  formData.append('action', action);

  switch(action) {
  case 'skill':
    if (skillId) {
      console.log('using skill: ', skillId);
      formData.append('action', 'skill');
      formData.append('whichskill', skillId);
    }
    break;
  case 'useitem':
    if (itemId) {
      formData.append('action', 'useitem');
      formData.append('whichitem', itemId);
    }
    break;
  case 'macro':
    if (macroId) {
      formData.append('action', 'macro');
      formData.append('macrotext', '');
      formData.append('whichmacro', macroId);
    }
    break;
  default:
    break;
  }
  
  const response = await axios.post('https://www.kingdomofloathing.com/fight.php',
    formData,
    {
      headers,
      responseType: 'text',
      withCredentials: true,
    },
  );
  
  return response.data;
}

async function doChoice({ cookies, option, which, pwd }: DoChoiceParams): Promise<unknown> {
  const headers = createKolHeaders(cookies);
  
  const formData = new URLSearchParams();
  formData.append('whichchoice', which);
  formData.append('option', option);
  formData.append('pwd', pwd);
  
  console.log('doChoice', which, option);
  
  const response = await axios.post('https://www.kingdomofloathing.com/choice.php',
    formData,
    {
      headers,
      responseType: 'text',
      withCredentials: true,
    },
  );
  
  return response.data;
} 

export function setupAdventure(app: Express): void {
  app.post('/adventure/attack', async (req, res) => {
    const { cookies } = extractHeaders(req);
      
    if (!cookies) {
      res.status(400).send({ error: 'missing-parameters' });
      res.end();
      
      return;
    }
      
    const action = req.body.action;
    const skillId = req.body.skill as string | undefined;
    const itemId = req.body.itemId as string | undefined;
    const macroId = req.body.macroId as string | undefined;
      
    const responseHtml = await doAttack({ action, cookies, itemId, macroId, skillId });
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
}
