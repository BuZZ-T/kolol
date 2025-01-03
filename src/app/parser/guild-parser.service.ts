import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import { BehaviorSubject, switchMap } from 'rxjs';

import { AbstractParserService } from './abstract/abstract-parser.service';
import { UserService } from '../user/user.service';
import type { UserData } from '../user/user.types';
import { PlayerClass } from '../user/user.types';

type GuildPlace = {
  action: string;
  image: string;
  name: string;
} | null;

type GuildData = {
  type: 't' | 'm' | 'f';
  // places: [GuildPlace, GuildPlace, GuildPlace, GuildPlace, GuildPlace, GuildPlace, GuildPlace, GuildPlace, GuildPlace];
  places: Array<GuildPlace>;
}

@Injectable({
  providedIn: 'root',
})
export class GuildParserService extends AbstractParserService<GuildData> {
  #tickSubject$ = new BehaviorSubject<void>(undefined);
  #userService = inject(UserService);

  #userToPlayerClassChar(user: UserData): GuildData['type'] {
    return ({
      [PlayerClass.SealClubber]: 'f',
      [PlayerClass.TurtleTamer]: 'f',
      [PlayerClass.PastaMancer]: 'm',
      [PlayerClass.Sauceror]: 'm',
      [PlayerClass.DiscoBandit]: 't',
      [PlayerClass.AccordionThief]: 't',
    } as const) [PlayerClass[user.playerClass] as unknown as PlayerClass];
  }
  
  protected override map({ doc }: { doc: Document; pwd: string; }): GuildData {
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

    return { places, type };
  }
  
  public update(): void {
    this.#tickSubject$.next();
  }

  public guild(): Observable<GuildData | null> {
    return this.#tickSubject$.asObservable().pipe(
      switchMap(() => this.#userService.getUser()),
      switchMap((user) => {
        const classChar = this.#userToPlayerClassChar(user);
        return this.parsePageToSubject(`guild.php?guild=${classChar}`);
      }),
    );
  }

  public challenge(): void {
    this.parsePageToSubject('guild.php?action=challenge').subscribe(() => {
      this.update();
    });
  }
}
