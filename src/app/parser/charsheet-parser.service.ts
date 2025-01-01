import { Injectable } from '@angular/core';
import { map, type Observable } from 'rxjs';

import { AbstractParserService } from './abstract/abstract-parser.service';
import { BoxesExtractor } from './extractors/BoxesExtractor';
import type { UserData } from '../user/user.types';

type CharsheetData = {
  title: string
  // skills: {
  //   id: string;
  //   name: string;
  //   permanent: 'no' | 'permanent' | 'hardcore-permanent';
  // }[]
  skills: Map<string, { id: string; permanent: 'permanent' | 'hardcore-permanent' | 'no'}>
}

@Injectable({
  providedIn: 'root',
})
export class CharsheetParserService extends AbstractParserService<CharsheetData | null> {
  
  #user: string = '';

  protected override map({ doc, pwd }: { doc: Document; pwd: string; }): CharsheetData | null {
    const box = new BoxesExtractor(doc).getBoxByTitle(this.#user);
    const element = box?.element;
    if (!element) {
      return null;
    }

    const firstSkill = element.querySelector('table table table a:not(.nounder):not([href])');
    const skillElements = Array.from(firstSkill?.parentElement?.querySelectorAll('a') || []);

    const skills = skillElements.reduce((skillMap, skill) => {

      const id = skill.getAttribute('onclick')?.match('.*whichskill=(\\d+).*')?.[1] || '';
      const name = skill.textContent || '';
      const permanentString = skill.nextSibling?.textContent || '';
      // "(HP)" is bold and it contains a <b> tag, so the next sibling is just the opening parenthesis 
      const permanent = { ' (': 'hardcore-permanent', ' (P)': 'permanent' }[permanentString] || 'no';

      skillMap.set(name, { id, permanent: permanent as 'no' | 'permanent' | 'hardcore-permanent' });
      
      return skillMap;
    }, new Map<string, { id: string; permanent: 'permanent' | 'hardcore-permanent' | 'no'}>());
    
    const title = element.querySelector('i')?.textContent || '';
    return {
      skills,
      title,
    };
  }

  public charsheet(user: UserData): Observable<{ charsheet: CharsheetData | null; user: UserData; }> {
    this.#user = user.name;
    return this.parsePageToSubject('charsheet.php').pipe(
      map(charsheet => ({ charsheet, user })),
    );
  }
}
