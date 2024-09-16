import { Injectable, inject } from '@angular/core';
import { ActionService } from 'src/app/action/action.service';
import { AbstractPopupService } from 'src/app/core/popup/abstract-popup.service';

import { UseMultiComponent } from './use-multi.component';

type ShowParams = {
  action: string | undefined;
  element: HTMLElement | undefined;
  itemId: string | undefined;
  quantity: number;
  pwd: string;
  which: 1 | 2 | 3;
}

@Injectable({
  providedIn: 'root',
})
export class UseMultiService extends AbstractPopupService {
  #actionService = inject(ActionService);
  
  public show({ action, element, itemId, quantity, pwd, which }: ShowParams): void {
    if (!element) {
      return;
    }
    const componentInstance = this.initStickyPortal(UseMultiComponent, element, {
      height: '70px',
      panelClass: '',
      position: 'below-above',
      width: '120px',
    });
    componentInstance.maxValue = quantity;
    componentInstance.submitText = action || 'Use';

    componentInstance.use.subscribe((value) => {
      if (itemId) {
        this.#actionService.useItem({ action: action || 'use', itemId, pwd, quantity: value, which });
      }
      this.close();
    });
  }
}
