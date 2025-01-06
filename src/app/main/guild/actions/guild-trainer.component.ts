import { Component, inject, Input } from '@angular/core';
import { DescriptionPopupService } from 'src/app/description-popup.service';

import type { GuildTrainerData } from '../guild.types';

@Component({
  selector: 'kolol-guild-trainer',
  templateUrl: './guild-trainer.component.html',
})
export class GuildTrainerComponent {

  #descriptionPopupService = inject(DescriptionPopupService);

  @Input({ required: true })
  public trainerData!: GuildTrainerData;

  public onBuy(id: string): void {
    console.log('onBuy', id);
  }

  public onDescription(id: string): void {
    this.#descriptionPopupService.showSkillDescription(id);
  }
}
