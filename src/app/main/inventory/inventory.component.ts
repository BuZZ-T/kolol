import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Equipment, InventoryDataWithPwd } from './inventory.types';
import { ActionService } from '../../action/action.service';
import { InventoryApiService } from '../../api/inventory-api.service';

type Section = 'consumables' | 'equipment' | 'miscellaneous';

@Component({
  selector: 'kolol-inventory',
  styleUrls: [ './inventory.component.scss' ],
  templateUrl: './inventory.component.html',
})
export class InventoryComponent implements OnInit {

  public inventory$: Observable<InventoryDataWithPwd | null> = of(null);
  // public currentPage: Page = 1;
  public sectionName: Section = 'consumables';

  public constructor(
    private inventoryApiService: InventoryApiService,
    private actionService: ActionService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.inventory$ = this.inventoryApiService.inventory();
  }

  public ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const section = params['section'];

      if ([ 'consumables', 'equipment',  'miscellaneous' ].includes(section)) {
        this.sectionName = section;
      }
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

  public use(itemId: string, pwd: string): void {
    console.log('use: ', itemId);
    switch(this.sectionName) {
    case 'consumables':
      this.consume(itemId, pwd);
      break;
    case 'equipment':
      this.equip(itemId, pwd);
      break;
    case 'miscellaneous':
      this.useMisc(itemId, pwd);
      break;
    }
  }

  public onSelect(section: Section): void {
    if (this.sectionName !== section) {
      this.router.navigate([ 'kol', 'inventory', section ]);
    }
  }

  public onUnequip(equipmentSection: keyof Equipment | 'acc1' | 'acc2' | 'acc3', pwd: string): void {
    this.actionService.unequipItem({ equipmentSection, pwd });
  }
}
