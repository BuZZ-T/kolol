import type { OnDestroy } from '@angular/core';
import { Component, inject } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { GuildActionParserService } from 'src/app/parser/guild-action-parser.service';
import type { GuildData } from 'src/app/parser/guild-parser.service';
import { GuildParserService } from 'src/app/parser/guild-parser.service';
import { RoutingService } from 'src/app/routing/routing.service';

import type { GuildTrainerData } from './guild.types';

@Component({
  selector: 'kolol-guild',
  styleUrl: './guild.component.scss',
  templateUrl: './guild.component.html',
})
export class GuildComponent implements OnDestroy {

  #stop = new Subject<void>();
  
  #guildParserService = inject(GuildParserService);
  #guildActionParserService = inject(GuildActionParserService);
  #routingService = inject(RoutingService);
  
  public guildData$ = new BehaviorSubject<GuildData | null>(null);
  public otherData$ = new BehaviorSubject<GuildTrainerData | null>(null);

  public constructor() {
    this.#guildParserService.guild()
      .pipe(takeUntil(this.#stop))
      .subscribe(guildData => {
        this.guildData$.next(guildData);
      });
  }

  public ngOnDestroy(): void {
    this.guildData$.complete();
    this.#stop.next();
    this.#stop.complete();
  }
  
  public onAction(url: string): void {
    if (url.startsWith('shop.php')) {
      this.#routingService.navigateTo(url);

      return;
    }

    switch(url) {
    case 'guild.php?place=ocg': {
      this.#guildParserService.action('ocg');
      break;
    }
    case 'guild.php?place=scg': {
      console.log('onAction scg');
      break;
    }
    case 'guild.php?place=trainer': {
      this.#guildActionParserService.trainer().subscribe(([ guildData, trainer ]) => {
        this.guildData$.next(guildData);
        this.otherData$.next(trainer);
      });
      console.log('onAction: trainer');
      break;
    }
    case 'guild.php?place=paco': {
      console.log('onAction: paco');
      break;
    }
    case 'guild.php?place=challenge': {
      console.log('onAction: challenge');
      break;
    }
    }
  }
}
