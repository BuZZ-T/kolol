import { inject, Injectable } from '@angular/core';
import { switchMap, type Observable } from 'rxjs';

import { AbstractMultiBoxParserService } from './abstract/abstract-multi-box-parser.service';
import { BoxesExtractor } from './extractors/BoxesExtractor';
import type { GuildData } from './guild-parser.service';
import type { GuildTrainerData } from '../main/guild/guild.types';
import { UserService } from '../user/user.service';
import { PlayerClass } from '../user/user.types';

function boxTitleByPlayerClass(playerClass: PlayerClass, action: string): string | undefined {
  switch(playerClass) {
  case PlayerClass.SealClubber:
  case PlayerClass.TurtleTamer: {
    return {
      challenge: 'Gunther, Lord of the Smackdown',
      ocg: playerClass === PlayerClass.SealClubber ? 'Terri, the Turtle Tamer' : 'Grignr, the Seal Clubber',
      scg: playerClass === PlayerClass.SealClubber ? 'Grignr, the Seal Clubber': 'Terri, the Turtle Tamer',
      trainer: 'Torg, the Trainer',
    }[action];
  }
  case PlayerClass.DiscoBandit:
  case PlayerClass.AccordionThief: {
    return {
      challenge: 'Shifty, the Thief Chief',
      ocg: playerClass === PlayerClass.DiscoBandit ? 'Stradella, the Accordion Thief' : 'Duncan Drisorderly, the Disco Bandit', 
      paco: 'Izzy the Lizard',
      scg: playerClass === PlayerClass.DiscoBandit ? 'Duncan Drisorderly, the Disco Bandit' : 'Stradella, the Accordion Thief',
      trainer: 'Lefty, the Trainer',
    }[action];
  }
  }

  // TODO
  return '';
}

@Injectable({
  providedIn: 'root',
})
export class GuildActionParserService extends AbstractMultiBoxParserService<GuildData, GuildTrainerData> {

  #userService = inject(UserService);
    
  #mapGuildPlace({ doc }: { doc: Document }): GuildData {
    const type = doc.querySelector('img')?.getAttribute('src')?.slice(-5, -4) as GuildData['type'];
    const places = Array.from(doc.querySelectorAll('td[width="100"][height="100"]')).map(placeElement => {
      const imageElement = placeElement.querySelector('img');
      const image = imageElement?.getAttribute('src') || '';
      const name = imageElement?.getAttribute('title') || '';
      const action = placeElement.querySelector('a')?.getAttribute('href')?.split('=')?.[1] || '';
        
      return {
        action,
        image,
        name,
      };
    });
        
    const back = doc.querySelector('a img[title="Exit"]')?.parentElement?.getAttribute('href') || '';
        
    return { back, places, type };
  }

  public trainer(): Observable<readonly[GuildData | null, GuildTrainerData | null]> {
    return this.#userService.getUser().pipe(
      switchMap(user => this.parse2('/guild.php?place=trainer', {}, this.#mapGuildPlace, ({ doc }) => {
        const trainerName = boxTitleByPlayerClass(user.playerClass, 'trainer');
        if (!trainerName) {
          return null;
        }
        const box = new BoxesExtractor(doc).getBoxByTitle(trainerName);
        if (!box) {
          return null;
        }

        const skills: GuildTrainerData['skills'] = Array.from(box.element.querySelectorAll('table table table tr')).map(skill => {

          const buttonElement = skill.querySelector('input[type=submit]');
          const imageElement = skill.querySelector('img');

          return {
            descriptionId: imageElement?.getAttribute('onclick')?.match('.*whichskill=(\\d+).*')?.[1] || '',
            id: skill.querySelector('input[name=skillid]')?.getAttribute('value') || '',
            image: imageElement?.getAttribute('src') || '',
            isDisabled: buttonElement?.getAttribute('disabled') === '',
            level: skill.querySelector('td')?.textContent?.trim().slice(6, -1) || '',
            meat: buttonElement?.getAttribute('value')?.slice(7, -6) || '0',
            name: skill.querySelector('a')?.textContent || '',
          };
        });
        
        return {
          description: box.element.querySelectorAll('center')[2].childNodes[0].textContent || '',
          image: box?.getImage().url || '',
          name: trainerName,
          skills,
          type: 'trainer',
        };
      })));
  }
}
