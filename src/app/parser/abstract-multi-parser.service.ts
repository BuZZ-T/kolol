import { BehaviorSubject, Observable, filter, map, withLatestFrom } from 'rxjs';

import { AbstractParserService } from './abstract-parser.service';
import { isTruthy } from '../utils/general';
import { distinctUntilChangedDeep } from '../utils/http.utils';

export abstract class AbstractMultiParserService<T> extends AbstractParserService<T> {

  private valueSubject = new BehaviorSubject<Record<string, T | undefined>>({});
  private multiValue$ = this.valueSubject.asObservable().pipe(
    distinctUntilChangedDeep(),
  );
    
  public parseMulti(id: string | number, path: string): Observable<T | undefined> {
    this.parse(path).pipe(
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
