import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';

import { Element, Location } from './location.types';
import { locationNameByPath } from './location.utils';
import { LocationParserService } from '../parser/location-parser.service';

@Component({
  selector: 'kolol-location',
  styleUrls: [ './location.component.scss' ],
  templateUrl: './location.component.html',
})
export class LocationComponent implements OnInit {

  public location$: Observable<Location | null> = of(null);

  public name = '';

  public constructor(
    private route: ActivatedRoute,
    private locationParserService: LocationParserService) { 
    //
  }

  public ngOnInit(): void {
    const snapshot = this.route.snapshot;

    const isPlace = snapshot.queryParamMap.get('p') === '1';
    const location = snapshot.paramMap.get('location') || '';

    this.name = locationNameByPath[location];

    const path = isPlace ? `place.php?whichplace=${location}` : `${location}.php`;
    this.location$ = this.locationParserService.parse(path);

  }

  /**
   * TODO: use [routerLink]
   */
  public tileClicked(element: Element): void {
    console.log('tileClicked', element.url);
  }
}
