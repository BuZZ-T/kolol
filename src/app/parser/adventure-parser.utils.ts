import { Observable, map } from 'rxjs';

import { extractDamage, extractItems, extractMeat, extractMoxieGain, extractMuscleGain, getBoxTitle } from './parser.utils';
import { Adventure, Choice, Fight, FightEnd, NonFight, Option } from '../adventure/adventure.types';

export const mapDocToAdventure = () => (source: Observable<{doc: Document, pwd: string}>): Observable<Adventure | null> => 
  source.pipe(
    map(({ doc, pwd }) => {
      console.log('doc', doc);
    
      const header = getBoxTitle(doc);
    
      if (header === 'Combat!') {
    
        const img = doc.querySelector('#monpic') as HTMLImageElement; 
    
        const innerHtml = doc.children[0].innerHTML;
    
        const isFightWon = innerHtml.includes('You win the fight!');
        // Two spaces after "You lose."!
        const isFightLost = innerHtml.includes('You lose.  You slink away, dejected and defeated.');
    
        const damage = extractDamage(doc);
        const allText = Array.from(doc.querySelectorAll('td')).map(e => e.innerText).join('');

        if (isFightWon || isFightLost) {
    
          const items = extractItems(doc);
          const goBack = Array.from(doc.querySelectorAll('a')).at(-1)?.getAttribute('href') || '';
    
          const fightEnd: FightEnd = {
            damage,
            effects: {
              meat: extractMeat(allText),
              moxie: extractMoxieGain(allText),
              muscle: extractMuscleGain(allText),
              mysticallity: '',
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
      } else if (header === 'Adventure Results:') {
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
      } else {
        // choice
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
    
      return null;
    }));
