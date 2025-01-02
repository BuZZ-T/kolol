import { Component, inject } from '@angular/core';
import { GuildParserService } from 'src/app/parser/guild-parser.service';

@Component({
  selector: 'kolol-guild',
  styleUrl: './guild.component.scss',
  templateUrl: './guild.component.html',
})
export class GuildComponent {

  #guildParserService = inject(GuildParserService);
  
  public guildData$ = this.#guildParserService.guild();

  public constructor() {
    this.guildData$.subscribe(guildData => {
      console.log('guildData: ', guildData);
    });
  }

  public onAction(url: string): void {
    switch(url) {
    case 'ocg': {
      console.log('onAction: ocg');
      break;
    }
    case 'scg': {
      console.log('onAction scg');
      break;
    }
    case 'trainer': {
      console.log('onAction: trainer');
      break;
    }
    case 'paco': {
      console.log('onAction: paco');
      break;
    }
    case 'guildstore3': {
      console.log('onAction: guildstore3');
      break;
    }
    case 'challenge': {
      console.log('onAction: challenge');
      break;
    }
    }
  }
}
