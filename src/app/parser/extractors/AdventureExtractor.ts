import type { AdventureError, AdventureUsables, Choice, Fight, FightEnd, LimitedUsableSkill, NonFight, Option, UsableItem, UsableSkill } from 'src/app/adventure/adventure.types';
import type { Answer, AnswerImage, AnswerLink, AnswerText, AnswerUnknown } from 'src/app/notice/notice.types';

import type { Box } from './Box';
import { BoxesExtractor } from './BoxesExtractor';

export class AdventureExtractor {

  #boxesExtractor: BoxesExtractor;

  public constructor(boxExtractor: BoxesExtractor)
  public constructor(doc: Document | Element)
  public constructor(docOrBox: BoxesExtractor | Document | Element) {
    this.#boxesExtractor = docOrBox instanceof BoxesExtractor ? docOrBox : new BoxesExtractor(docOrBox);
  }

  #extractFromForm(box: Box): AdventureUsables {
    const fightForm = box.element.querySelector('#fightform') as HTMLFormElement;

    // using .slice(1) to skip the first option, which is "(select an <...>)"

    const itemSelect = fightForm.querySelector('select[name="whichitem"]') as HTMLSelectElement;
    const items: UsableItem[] = Array.from(itemSelect.options).slice(1).map(option => {
      const item = option.textContent || '';
      const [ ,name, amount ] = item.match(/(.*?) \((.*)\)/) || [];
      
      return {
        amount: parseInt(amount, 10) || 0,
        id: option.value,
        image: option.getAttribute('picurl') || '',
        name,
      };
    });

    const skillSelect = fightForm.querySelector('select[name="whichskill"]') as HTMLSelectElement;
    const skills: Array<UsableSkill | LimitedUsableSkill> = Array.from(skillSelect.options).slice(1).map(option => {
      const skill = option.textContent || '';
      const [ , name, cost ] = skill.match(/(.*?) \((.*) Mojo Points\)/) || [];
      
      if (!name || !cost) {
        const [ , usesLeftName, usesLeft ] = skill.match(/(.*?) \((.*) uses left today\)/) || [];

        return {
          id: option.value,
          image: option.getAttribute('picurl') || '',
          name: usesLeftName,
          usesLeft: parseInt(usesLeft, 10) || 0,
        };

      }
      return {
        cost: parseInt(cost, 10) || 0,
        id: option.value,
        image: option.getAttribute('picurl') || '',
        name,
      };
    });

    const macroSelect = fightForm.querySelector('select[name="whichmacro"]') as HTMLSelectElement;
    const macros = Array.from(macroSelect.options).slice(1).map(option => ({
      id: option.value,
      image: option.getAttribute('picurl') || '',
      name: option.textContent || '',
    }));

    return {
      items,
      macros,
      skills,
    };
  }
  
  public hasFight(): boolean {
    return this.#boxesExtractor.hasBoxWithTitle('Combat!');
  }

  public getFight(): Fight | FightEnd | null {
    const box = this.#boxesExtractor.getBoxByTitle('Combat!');

    if (!box) {
      return null;
    }

    const img = box.element.querySelector('#monpic') as HTMLImageElement; 
    
    const innerHtml = box.element.children[1].innerHTML;
  
    const isFightWon = innerHtml.includes('You win the fight!');
    // Two spaces after "You lose."!
    const isFightLost = innerHtml.includes('You lose.  You slink away, dejected and defeated.');
    const isRunAway = innerHtml.includes('You run away, like a little coward.');
  
    const damage = box.getDamage();
    const allText = box.getText();
  
    const items = box.getItems();
    const meat = box.getMeat();

    if (isFightWon || isFightLost || isRunAway) {
      const goBack = Array.from(box.element.querySelectorAll('a')).at(-1)?.getAttribute('href') || '';
  
      const stats = box.getStatGain();

      // link containing "adventure.php"
      const adventureAgainElement = box.element.querySelector('a[href*="adventure.php"]');
      const snarfblat = adventureAgainElement?.getAttribute('href')?.match(/snarfblat=(\d+)/)?.[1] || '';
      
      const fightEnd: FightEnd = {
        damage,
        effects: {
          meat,
        },
        goBack,
        items,
        monster: {
          image: {
            height: img.getAttribute('height') || '',
            url: img.getAttribute('src') || '',
            width: img.getAttribute('width') || '',
          },
          name: box.element.querySelector('#monname')?.innerHTML || '',
        },
        result: isFightWon ? 'won' : isFightLost ? 'lost' : 'run-away',
        snarfblat,
        stats,
        type: 'fight-end',
      };
  
      return fightEnd;
  
    }

    const usables = this.#extractFromForm(box);

    const fight: Fight = {
      damage,
      effectLikes: this.#boxesExtractor.getEffectLikes(),
      // TODO
      isCritical: false,
      // TODO
      isEnemyCritical: false,
      isEnemyFumble: Array.from(box.element.querySelectorAll('font[color="red"]')).some(e => e.innerHTML.includes('(FUMBLE!)')),
      isFumble: Array.from(box.element.querySelectorAll('font[color="red"] b')).some(e => e.innerHTML.includes('FUMBLE!')),
      item: items[0],
      jump: allText.includes('You get the jump on') ? 'you' : allText.includes('gets the jump on you') ? 'monster' : 'none',
      meat,
      monster: {
        image: {
          height: img.getAttribute('height') || '',
          url: img.getAttribute('src') || '',
          width: img.getAttribute('width') || '',
        },
        name: box.element.querySelector('#monname')?.innerHTML || '',
      },
      type: 'fight',
      usables,
    };
  
    return fight;
    
  }

  public hasNonFight(): boolean {
    return this.#boxesExtractor.hasBoxWithTitle('Adventure Results:', 'Results:');
  }

  public getNonFight(): NonFight | null {
    const box = this.#boxesExtractor.getBoxByTitle('Adventure Results:') || this.#boxesExtractor.getBoxByTitle('Results:');

    const adventureAgainBox = this.#boxesExtractor.getBoxByTitle('Adventure Again:');

    if (!box || !adventureAgainBox) {
      return null;
    }

    // link containing "adventure.php"
    const adventureAgainElement = adventureAgainBox.element.querySelector('a[href*="adventure.php"]');
    const snarfblat = adventureAgainElement?.getAttribute('href')?.match(/snarfblat=(\d+)/)?.[1] || '';

    const nonFight: NonFight = {
      description: box.getDescription(),
      image: box.getImage().url,
      items: box.getItems(),
      snarfblat,
      title: box.getTitle(),
      type: 'non-fight',
    };

    return nonFight;
  }

  public hasChoice(): boolean {
    return this.#boxesExtractor.hasBoxWithQuery('form[action="choice.php"]');
  }

  public getChoice(): Choice | null {
    const box = this.#boxesExtractor.getBoxByQuery('form[action="choice.php"]');

    if (!box) {
      return null;
    }

    const image = box.getImage().url;
    const which = box.element.querySelector('input[name="whichchoice"]')?.getAttribute('value') || '';
    const description = box.getDescription();

    const options = Array.from(box.element.querySelectorAll('form')).map((form) => {
      const option = form.querySelector('input[name="option"]')?.getAttribute('value') || '';
      const text = form.querySelector('input[type="submit"]')?.getAttribute('value') || '';
      
      const o: Option = {
        option,
        text,
      };
      
      return o;
                    
    });

    return {
      description,
      image,
      options,
      pwd: box.getPwd(),
      title: box.getTitle(),
      type: 'choice',
      which,
    };
  }

  public getAnswer(): Answer | null {
    // FIXME: limited to first box
    const box = this.#boxesExtractor.getBoxByIndex(0);

    if (!box) {
      return null;
    }

    // first table
    const resultTable = box.querySelector('table');
  
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

  public hasAdventureError(): boolean {
    return this.#boxesExtractor.hasBoxWithTitle('Adventure!');
  }

  public getAdventureError(): AdventureError | null {
    const box = this.#boxesExtractor.getBoxByTitle('Adventure!');

    if (!box) {
      return null;
    }

    return {
      error: box.getDescription(),
      type: 'adventure-error',
    };
  }
}
