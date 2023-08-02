import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AbstractParserService } from './abstract-parser.service';
import { LoginService } from '../login/login.service';
import { SkillData, SkillsData, SkillsDataWithPwd } from '../main/skills/skills.types';
import { RoutingService } from '../routing/routing.service';

@Injectable({
  providedIn: 'root',
})
/**
   * TODO: Grouping
   * - Big and Chunky
   * - Classic (Buff/non-buff)
   * - Classic
   * - Functional
   */
export class SkillsParserService extends AbstractParserService<SkillsDataWithPwd> {

  public constructor(httpClient: HttpClient, loginService: LoginService, routingService: RoutingService) {
    super(httpClient, loginService, routingService);
  }

  protected map({ doc, pwd }: {doc: Document, pwd: string}): SkillsDataWithPwd {
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
  }
  
  public skills(): Observable<SkillsDataWithPwd | null> {
    return this.parseToSubject('skillz.php');
  }
}
