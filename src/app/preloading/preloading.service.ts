import { Injectable } from '@angular/core';
import { Observable, concatMap, delay, from, of, tap } from 'rxjs';

import { ParseApiService } from '../api/parse-api.service';
import { CampgroundParserService } from '../parser/campground-parser.service';
import { PlaceParserService } from '../parser/place-parser.service';

@Injectable({
  providedIn: 'root',
})
export class PreloadingService {

  private readonly DELAY = 200;

  private preloadedPlaces: string[] = [
    'mountains',
    'plains',
    'town',
    'town_market',
    'town_right',
    'town_wrong',
    'woods',
  ];

  private preloads: Array<() => unknown> = [
    (): unknown => this.parseApiService.inventory(),
    (): unknown => this.parseApiService.skills(),
    (): unknown => this.campgroundParserService.campground(),
  ];

  public constructor(
    private placeParserService: PlaceParserService,
    private parseApiService: ParseApiService,
    private campgroundParserService: CampgroundParserService,
  ) {
    //
  }

  private doPreload(fn: (path: string) => Observable<unknown>, path: string): void {
    fn(path).subscribe();
  }

  private preloadPlaces(): void {
    from(this.preloadedPlaces).pipe(
      concatMap((place) => of(place).pipe(delay(this.DELAY))),
      tap((place) => this.doPreload(this.placeParserService.place.bind(this.placeParserService), place)),
    ).subscribe({
      complete: () => {
        from(this.preloads).pipe(
          concatMap((preloadFn) => of(preloadFn).pipe(delay(this.DELAY))),
          tap((preload) => preload()),
        ).subscribe();
      },
    });
  }

  public preload(): void {
    setTimeout(() => {
      this.preloadPlaces();
    }, 2000);
  }

}
