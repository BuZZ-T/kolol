import type { Observable } from 'rxjs';
import { BehaviorSubject, filter, map, withLatestFrom } from 'rxjs';

import { AbstractParserService } from './abstract-parser.service';
import { isTruthy } from '../../../shared/general';
import { distinctUntilChangedDeep } from '../../utils/http.utils';

export abstract class AbstractMultiCacheParserService<T> extends AbstractParserService<T> {

  private valueSubject = new BehaviorSubject<Record<string, T | undefined>>({});
  private multiValue$ = this.valueSubject.asObservable().pipe(
    distinctUntilChangedDeep(),
  );
    
  public parseMulti(id: string | number, path: string): Observable<T | undefined> {
    this.parsePage(path).pipe(
      filter(isTruthy),
      withLatestFrom(this.valueSubject),
      map(([ value, values ]) => ({
        ...values,
        [id]: value,
      })),
    ).subscribe(values => {
      this.valueSubject.next(values);
    });

    return this.multiValue$.pipe(
      map(values => id ? values[id] : undefined),
    );
  }
}
