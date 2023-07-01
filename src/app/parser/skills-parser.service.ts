import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

import { ParserService } from './parser.service';
import { SkillData, SkillsData, SkillsDataWithPwd } from '../main/skills/skills.types';

@Injectable({
  providedIn: 'root',
})
export class SkillsParserService {

  private skillsSubject = new BehaviorSubject<SkillsDataWithPwd | null>(null);

  public constructor(private parserService: ParserService) {
    //
  }
  
  public skills(): Observable<SkillsDataWithPwd | null> {
    this.parse().subscribe(skills => {
      this.skillsSubject.next(skills);
    });

    return this.skillsSubject.asObservable();
  }

  /**
   * TODO: Grouping
   * - Big and Chunky
   * - Classic (Buff/non-buff)
   * - Classic
   * - Functional
   */
  private parse(): Observable<SkillsDataWithPwd> {
    return this.parserService.parse('skillz.php').pipe(
      map(({ doc, pwd }) => {
        const sections = Array.from(doc.querySelectorAll('.cat'));
        
        const skills = sections.reduce((result, section) => {
          const sectionTitle = (section.querySelector('b')?.childNodes[0].nodeValue?.replace(' ', '').replace('-', '') ?? '') as keyof SkillsData;
          const skillElements = Array.from(section.querySelectorAll('.skill'));

          const skills = skillElements.map(skill => {
            const cost = parseInt(skill.querySelector('.cost')?.innerHTML.slice(1, -3) ?? '', 10);
            const image = skill.querySelector('img')?.getAttribute('src') ?? '';
            const name = skill.querySelector('b')?.innerHTML ?? '';
            const usable = !skill.classList.contains('disabled');
            const id = skill.getAttribute('rel') ?? '';
            const description = skill.nextElementSibling?.querySelector('span.small')?.textContent ?? '';

            const skillData: SkillData = {
              cost,
              dailyUseAmount: undefined, // TODO
              description,
              id,
              image,
              name,
              usable,
              useAmount: undefined, // TODO
            };

            return skillData;
          });

          result[sectionTitle] = skills;

          return result;
        }, {} as SkillsData);

        return {
          pwd,
          skills,
        };
      }),
    );
  }
}
