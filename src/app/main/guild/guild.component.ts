import { Component, inject } from '@angular/core';
import { GuildParserService } from 'src/app/parser/guild-parser.service';
import { RoutingService } from 'src/app/routing/routing.service';

@Component({
  selector: 'kolol-guild',
  styleUrl: './guild.component.scss',
  templateUrl: './guild.component.html',
})
export class GuildComponent {

  #guildParserService = inject(GuildParserService);
  #routingService = inject(RoutingService);
  
  public guildData$ = this.#guildParserService.guild();

  public onAction(url: string): void {
    if (url.startsWith('shop.php')) {
      this.#routingService.navigateTo(url);

      return;
    }

    switch(url) {
    case 'ocg': {
      this.#guildParserService.action('ocg');
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
    case 'challenge': {
      console.log('onAction: challenge');
      break;
    }
    }
  }
}
