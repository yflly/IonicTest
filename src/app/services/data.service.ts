import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { actionAuthSetTokens } from '../core/auth/auth.actions';
import { Account, Tokens, User } from '../core/auth/auth.models';
import { AppState } from '../core/core.module';
import { Todo, Todos } from '../core/todo/todo.models';

@Injectable({
  providedIn: 'root',
})
export class DataService implements OnDestroy {
  private readonly ngUnsubscribe: Subject<void> = new Subject<void>();
  private readonly endpoint = 'https://test.kmedini.fr';

  constructor(private readonly http: HttpClient) {}

  public getUser(accessToken: string): Observable<User> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${accessToken}`
    );
    return this.http
      .get<User>(`${this.endpoint}/me`, { headers })
      .pipe(takeUntil(this.ngUnsubscribe));
  }

  public getTodoList(accessToken: string): Observable<Todos> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${accessToken}`
    );
    return this.http
      .get<Todos>(`${this.endpoint}/todos`, { headers })
      .pipe(takeUntil(this.ngUnsubscribe));
  }

  public addTodo(accessToken: string, label: string) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${accessToken}`
    );
    const body = {
      label,
    };
    return this.http
      .post<Todo>(`${this.endpoint}/todo`, body, { headers })
      .pipe(takeUntil(this.ngUnsubscribe));
  }

  public setTodo(
    accessToken: string,
    id: string,
    label: string,
    done: boolean
  ) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${accessToken}`
    );
    const body = {
      id,
      label,
      done,
    };
    return this.http
      .put(`${this.endpoint}/todo/${id}`, body, { headers })
      .pipe(takeUntil(this.ngUnsubscribe));
  }

  public deleteTodo(accessToken: string, id: string) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${accessToken}`
    );
    return this.http
      .delete(`${this.endpoint}/todo/${id}`, { headers })
      .pipe(takeUntil(this.ngUnsubscribe));
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
