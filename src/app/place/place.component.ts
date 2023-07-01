import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';

import { Element, Place } from './place.types';
import { PlaceParserService } from '../parser/place-parser.service';
import { RoutingService } from '../routing/routing.service';

@Component({
  selector: 'kolol-place',
  styleUrls: [ './place.component.scss' ],
  templateUrl: './place.component.html',
})
export class PlaceComponent implements OnInit {

  public place$: Observable<Place | null> = of(null);

  public constructor(
    private route: ActivatedRoute,
    private placeParserService: PlaceParserService,
    private routingService: RoutingService) { 
    //
  }

  public ngOnInit(): void {
    // this.place$ = this.route.paramMap.pipe(
    //   switchMap((params) => {
    //     const place = params.get('place') || '';
    //     const path = `place.php?whichplace=${place}`;
    //     return this.placeParserService.parse(path);
    //   }));

    this.place$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const place = params.get('place') || '';

        return this.placeParserService.place(place);
      }),
    );
  }

  /**
   * TODO: use [routerLink] (or interceptor)
   */
  public tileClicked(element: Element): void {
    console.log('tileClicked', element.url);
    this.routingService.navigateTo(element.url);
  }

  public backClicked(backUrl: string): void {
    this.routingService.navigateTo(backUrl);
  }
}
