import type { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import type { ActivatedRoute } from '@angular/router';
import type { Observable } from 'rxjs';
import { of, switchMap } from 'rxjs';

import type { Place } from './place.types';
import type { PlaceParserService } from '../parser/place-parser.service';
import type { RoutingService } from '../routing/routing.service';

@Component({
  selector: 'kolol-place',
  styleUrls: [ './place.component.scss' ],
  templateUrl: './place.component.html',
})
export class PlaceComponent implements OnInit {

  public place$: Observable<Place | undefined> = of(undefined);

  public constructor(
    private route: ActivatedRoute,
    private placeParserService: PlaceParserService,
    private routingService: RoutingService) { 
    //
  }

  public ngOnInit(): void {
    this.place$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const place = params.get('place') || '';

        return this.placeParserService.place(place);
      }),
    );
  }

  public backClicked(backUrl: string): void {
    this.routingService.navigateTo(backUrl);
  }
}
