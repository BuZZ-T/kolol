import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';

import { Element, Location } from './location.types';
import { LocationParserService } from '../parser/location-parser.service';
import { RoutingService } from '../routing/routing.service';
import { Site } from '../routing/routing.types';

@Component({
  selector: 'kolol-location',
  styleUrls: [ './location.component.scss' ],
  templateUrl: './location.component.html',
})
export class LocationComponent implements OnInit {

  public location$: Observable<Location | null> = of(null);

  public constructor(
    private route: ActivatedRoute,
    private locationParserService: LocationParserService,
    private routingService: RoutingService) { 
    //
  }

  public ngOnInit(): void {
    this.location$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const location = params.get('location') || '';
        const path = `place.php?whichplace=${location}`;
        return this.locationParserService.parse(path);
      }));
  }

  /**
   * TODO: use [routerLink] (or interceptor)
   */
  public tileClicked(element: Element): void {
    console.log('tileClicked', element.url);
    this.routingService.navigateTo(element.url as Site);
  }

  public backClicked(backUrl: string): void {
    this.routingService.navigateTo(backUrl as Site);
  }
}
