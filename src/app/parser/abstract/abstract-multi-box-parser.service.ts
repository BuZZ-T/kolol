import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import type { Observable } from 'rxjs';
import { BehaviorSubject, catchError, map } from 'rxjs';
import { LoginService } from 'src/app/login/login.service';
import { RoutingService } from 'src/app/routing/routing.service';
import { handleNoSession, handleRedirect } from 'src/app/utils/http.utils';

import { mapHtmlToDocAndPwd, switchMapToGet } from '../utils/parser.operators';
import { handleError } from '../utils/parser.utils';

type MapFunction<TResult> = ({ doc, pwd }: {doc: Document, pwd: string}) => TResult | null;

export abstract class AbstractMultiBoxParserService<T, U = unknown, V = unknown, W = unknown> {
  #httpClient = inject(HttpClient);
  #loginService = inject(LoginService);
  #routingService = inject(RoutingService);

  #lastValues = new BehaviorSubject<[T | null, U | null, V | null, W | null]>([ null, null, null, null ]);

  #parseToHDocAndPwd(path: string, params: Record<string, string>): Observable<{ doc: Document, pwd: string }> {
    return this.#loginService.session$.pipe(
      handleNoSession(this.#routingService),
      switchMapToGet(this.#httpClient, path, params),
      handleRedirect(this.#routingService),
      map(event => event.body || ''),
      mapHtmlToDocAndPwd(),
      catchError(handleError),
    );
  }

  public parse(path: string, params: Record<string, string>, map1: MapFunction<T>): Observable<T | null> {
    this.#parseToHDocAndPwd(path, params).pipe(
      map(({ doc, pwd }) => map1({ doc, pwd })),
      catchError(handleError),
    ).subscribe(value1 => {
      this.#lastValues.next([ value1, null, null, null ]);
    });

    return this.#lastValues.asObservable().pipe(
      map(([ value1 ]) => value1),
    );
  }
  
  public parse2(path: string, params: Record<string, string>,map1: MapFunction<T>, map2: MapFunction<U>): Observable<[T | null, U | null]> {
    this.#parseToHDocAndPwd(path, params).pipe(
      map(({ doc, pwd }) => [ map1({ doc, pwd }), map2({ doc, pwd }) ] as const),
      catchError(handleError),
    ).subscribe(([ value1, value2 ]) => {
      this.#lastValues.next([ value1, value2, null, null ]);
    });

    return this.#lastValues.asObservable().pipe(
      map(([ value1, value2 ]) => [ value1, value2 ]),
    );
  }

  public parse3(path: string, params: Record<string, string>, map1: MapFunction<T>, map2: MapFunction<U>, map3: MapFunction<V>): Observable<[T | null, U | null, V | null]> {
    this.#parseToHDocAndPwd(path, params).pipe(
      map(({ doc, pwd }) => [ map1({ doc, pwd }), map2({ doc, pwd }), map3({ doc, pwd }) ] as [T | null, U | null, V | null]),
      catchError(handleError),
    ).subscribe(([ value1, value2, value3 ]) => {
      this.#lastValues.next([ value1, value2, value3, null ]);
    });

    return this.#lastValues.asObservable().pipe(
      map(([ value1, value2, value3 ]) => [ value1, value2, value3 ]),
    );
  }

  public parse4(path: string, params: Record<string, string>, map1: MapFunction<T>, map2: MapFunction<U>, map3: MapFunction<V>, map4: MapFunction<W>): Observable<readonly[T | null, U | null, V | null, W | null]> {
    this.#parseToHDocAndPwd(path, params).pipe(
      map(({ doc, pwd }) => [ map1({ doc, pwd }), map2({ doc, pwd }), map3({ doc, pwd }), map4({ doc, pwd }) ] as const),
      catchError(handleError),
    ).subscribe(([ value1, value2, value3, value4 ]) => {
      this.#lastValues.next([ value1, value2, value3, value4 ]);
    });

    return this.#lastValues.asObservable().pipe(
      map(([ value1, value2, value3, value4 ]) => [ value1, value2, value3, value4 ]),
    );
  }
}
