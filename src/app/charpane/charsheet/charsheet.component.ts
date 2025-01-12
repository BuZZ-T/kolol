import { Component, inject } from '@angular/core';
import { switchMap } from 'rxjs';
import { CharsheetParserService } from 'src/app/parser/charsheet-parser.service';
import { UserService } from 'src/app/user/user.service';
import { PlayerClass } from 'src/app/user/user.types';

@Component({
  selector: 'kolol-charsheet',
  styleUrl: './charsheet.component.scss',
  templateUrl: './charsheet.component.html',
})
export class CharsheetComponent {

  #userService = inject(UserService);
  #charsheetParserService = inject(CharsheetParserService);

  public charsheet$ = this.#userService.getUser().pipe(
    switchMap(user => this.#charsheetParserService.charsheet(user)),
  );

  public PlayerClass = PlayerClass;
}
