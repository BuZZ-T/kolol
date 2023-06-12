import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

import { InventoryDataWithPwd } from './inventory.types';
import { ActionService } from '../../action/action.service';
import { InventoryParserService } from '../../parser/inventory-parser.service';

@Component({
  selector: 'kolol-inventory',
  styleUrls: [ './inventory.component.scss' ],
  templateUrl: './inventory.component.html',
})
export class InventoryComponent implements OnInit {

  public inventory$: Observable<InventoryDataWithPwd | null> = of(null);

  public constructor(
    private inventoryParserService: InventoryParserService,
    private actionService: ActionService) {
    //
  }

  public ngOnInit(): void {
    this.inventory$ = this.inventoryParserService.inventory$;

    this.inventory$.subscribe(inventory => {
      console.log('inv: ', inventory);
    });
  }

  public consume(itemId: string, pwd: string): void {
    console.log('consume: ', itemId);
    this.actionService.useItem({ itemId, pwd, which: 1 });
  }

  public equip(itemId: string, pwd: string): void {
    console.log('equip: ', itemId);
    this.actionService.equipItem({ itemId, pwd, which: 2 });
  }

  public useMisc(itemId: string, pwd: string): void {
    this.actionService.useItem({ itemId, pwd, which: 3 });
  }
}
