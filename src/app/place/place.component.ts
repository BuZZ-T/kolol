import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';

import { Place } from './place.types';
import { PlaceParserService } from '../parser/place-parser.service';
import { RoutingService } from '../routing/routing.service';

@Component({
  selector: 'kolol-place',
  styleUrls: [ './place.component.scss' ],
  templateUrl: './place.component.html',
})
export class PlaceComponent implements OnInit {
  #route = inject(ActivatedRoute);
  #placeParserService = inject(PlaceParserService);
  #routingService = inject(RoutingService);

  public place$: Observable<Place | undefined> = of(undefined);

  public ngOnInit(): void {
    this.place$ = this.#route.paramMap.pipe(
      switchMap((params) => {
        const place = params.get('place') || '';

        return this.#placeParserService.place(place);
      }),
    );
  }

  public backClicked(backUrl: string): void {
    this.#routingService.navigateTo(backUrl);
  }
}
