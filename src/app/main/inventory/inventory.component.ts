import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest, of } from 'rxjs';

import { InventoryData } from './inventory.types';
import { InventoryParserService } from '../../parser/inventory-parser.service';

@Component({
  selector: 'kolol-inventory',
  styleUrls: [ './inventory.component.scss' ],
  templateUrl: './inventory.component.html',
})
export class InventoryComponent implements OnInit {

  public inventory$: Observable<InventoryData | null> = of(null);

  public constructor(private inventoryParserService: InventoryParserService) {
    //
  }

  public ngOnInit(): void {
    this.inventory$ = this.inventoryParserService.inventory$;
    // .subscribe(inventory => {
    //   console.log('inv: ', inventory);
    // });
  }
}
