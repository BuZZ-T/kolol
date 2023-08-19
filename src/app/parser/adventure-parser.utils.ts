import { Observable, map } from 'rxjs';

import { extractAllTdText, extractDamage, extractItems, extractMeat, extractStatGain, getBoxTitle } from './parser.utils';
import { Adventure, Choice, Fight, FightEnd, NonFight, Option } from '../adventure/adventure.types';
import { Answer, AnswerImage, AnswerLink, AnswerText, AnswerUnknown, Notice } from '../notice/notice.types';

function mapDocToFight(doc: Document): Fight | FightEnd {
  const img = doc.querySelector('#monpic') as HTMLImageElement; 
    
  const innerHtml = doc.children[0].innerHTML;

  const isFightWon = innerHtml.includes('You win the fight!');
  // Two spaces after "You lose."!
  const isFightLost = innerHtml.includes('You lose.  You slink away, dejected and defeated.');

  const damage = extractDamage(doc);
  const allText = extractAllTdText(doc);

  if (isFightWon || isFightLost) {

    const items = extractItems(doc);
    const goBack = Array.from(doc.querySelectorAll('a')).at(-1)?.getAttribute('href') || '';

    const { moxie, muscle, mysticallity } = extractStatGain(allText);

    const fightEnd: FightEnd = {
      damage,
      effects: {
        meat: extractMeat(allText),
        moxie,
        muscle,
        mysticallity,
      },
      goBack,
      items,
      monster: {
        image: {
          height: img.getAttribute('height') || '',
          url: img.getAttribute('src') || '',
          width: img.getAttribute('width') || '',
        },
        name: doc.querySelector('#monname')?.innerHTML || '',
      },
      type: 'fight-end',
      won: isFightWon,
    };

    return fightEnd;

  }

  const fight: Fight = {
    damage,
    effects: {
      hpLoss: '',
    },
    jump: allText.includes('You get the jump on') ? 'you' : allText.includes('gets the jump on you') ? 'monster' : 'none',
    monster: {
      image: {
        height: img.getAttribute('height') || '',
        url: img.getAttribute('src') || '',
        width: img.getAttribute('width') || '',
      },
      name: doc.querySelector('#monname')?.innerHTML || '',
    },
    type: 'fight',
  };

  return fight;
}

function mapDocToChoice(doc: Document, header: string, pwd: string): Choice {
  // The first image is the choice image.
  const image = doc.querySelector('img')?.getAttribute('src') || '';
  const which = doc.querySelector('input[name="whichchoice"]')?.getAttribute('value') || '';
  const description = Array.from(doc.querySelectorAll('p')).map(p => p.innerHTML).join('\n');
    
  const options = Array.from(doc.querySelectorAll('form')).map((form) => {
    const option = form.querySelector('input[name="option"]')?.getAttribute('value') || '';
    const text = form.querySelector('input[type="submit"]')?.getAttribute('value') || '';
    
    const o: Option = {
      option,
      text,
    };
    
    return o;
                  
  });
    
  const choice: Choice = {
    description,
    image,
    options,
    pwd,
    title: header,
    type: 'choice',
    which,
  };
    
  return choice;
}

function mapDocToNonFight(doc: Document): NonFight {
  // non-fight
  const title = doc.querySelectorAll('b')[1]?.innerHTML || '';
  const image = doc.querySelector('img')?.getAttribute('src') || '';
  const description = doc.querySelector('blockquote')?.innerHTML || ''; // TODO: does this work?
      
  const items = extractItems(doc);
          
  const nonFight: NonFight = {
    description,
    image,
    items,
    title,
    type: 'non-fight',
  };
  
  return nonFight;
}

function mapDocToAnswer(doc: Document): Answer {
  // first table
  const resultTable = doc.querySelector('table');

  const title = resultTable?.querySelector('b')?.textContent ?? '';

  // the second tr holds another table, which holds a <center>, which holds a table, which holds the content
  const content = resultTable?.querySelectorAll('tr')?.[1]?.querySelector('center')?.querySelector('td');

  const entries = Array.from(content?.childNodes || []).map(child => {
    switch(child.nodeName) {
    case '#text': {
      const answerText: AnswerText = {
        type: 'text',
        value: child.textContent ?? '',
      };
      return answerText;
    }
    default: {
      return Array.from(child.childNodes).map(node => {
        switch(node.nodeName) {
        case '#text': {
          const answerText: AnswerText = {
            type: 'text',
            value: node.textContent ?? '',
          };
          return answerText;
        }
        case 'A': {
          const answerLink: AnswerLink = {
            href: (node as HTMLAnchorElement)?.getAttribute('href') ?? '',
            type: 'link',
            value: node.textContent ?? '',
          };

          return answerLink;
        }
        case 'IMG': {
          const answerImage: AnswerImage = {
            type: 'image',
            value: (node as HTMLImageElement).getAttribute('src') ?? '',
          };
          return answerImage;
        }
        default: {
          const answerUnknown: AnswerUnknown = {
            node: child.nodeName,
            type: 'unknown',
          };

          return answerUnknown;
        }
        }
      });

    }
    }
  });

  const answer: Answer = {
    entries,
    title,
    type: 'answer',
  };

  return answer;
}

export const mapDocToAdventure = () => (source: Observable<{doc: Document, pwd: string}>): Observable<Adventure | null> => 
  source.pipe(
    map(({ doc, pwd }) => {
      console.log('doc', doc);
    
      const header = getBoxTitle(doc);
    
      if (header === 'Combat!') {
        return mapDocToFight(doc);
 
      } else if (header === 'Adventure Results:') {
        return mapDocToNonFight(doc);
      } else if(doc.querySelectorAll('form').length > 0) {
        return mapDocToChoice(doc, header, pwd);
        // } else {
        //   return mapDocToAnswer(doc);
      }
      return null;
    }));

export const mapDocToNotice = () => (source: Observable<{doc: Document, pwd: string}>): Observable<Notice | null> =>
  source.pipe(
    map(({ doc, pwd }) => {
      const header = getBoxTitle(doc);

      if(doc.querySelectorAll('form').length > 0) {
        return mapDocToChoice(doc, header, pwd);
      }

      return mapDocToAnswer(doc);
    }));
