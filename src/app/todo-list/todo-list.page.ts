import { Component, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { iif, NEVER, Observable, of, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { User } from '../core/auth/auth.models';
import { selectUser } from '../core/auth/auth.selectors';
import { AppState } from '../core/core.module';
import { actionGetTodoList, actionTodoAdd, actionTodoDelete, actionTodoSet } from '../core/todo/todo.actions';
import { Todo } from '../core/todo/todo.models';
import { selectTodoList } from '../core/todo/todo.selectors';
import { Dialog} from '@angular/cdk/dialog';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { ModalController } from '@ionic/angular';
import { AppMobileDialogAddTodoComponent } from './mobile-dialog-add-todo';
import { AppDialogAddTodoComponent } from './dialog-add-todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: 'todo-list.page.html',
  styleUrls: ['todo-list.page.scss'],
})
export class TodoListPage implements OnDestroy {
  public user$: Observable<User> | undefined;
  public list$: Observable<Array<Todo>> | undefined;
  public breakpointMatch$: Observable<boolean>;

  private readonly ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private store: Store<AppState>,
    private dialog: Dialog,
    private breakpointObserver: BreakpointObserver,
    private modalCtrl: ModalController
  ) {
    this.refresh();

    this.user$ = this.store.pipe(
      takeUntil(this.ngUnsubscribe),
      select(selectUser)
    );

    this.list$ = this.store.pipe(
      takeUntil(this.ngUnsubscribe),
      select(selectTodoList)
    );

    this.breakpointMatch$ = this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small
    ])
    .pipe(
      takeUntil(this.ngUnsubscribe),
      switchMap((state: BreakpointState) => iif(() => state !== undefined, of(state.matches), NEVER)
      )
    );
  }

  public refresh(ev?: any) {
    this.store.dispatch(actionGetTodoList());
  }

  async openMobileDialog() {
    const modal = await this.modalCtrl.create({
      component: AppMobileDialogAddTodoComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'add' && data !== undefined) {
      this.store.dispatch(actionTodoAdd({label: data}));
    }
  }

  public addTodo() {
    const isSmallScreen = this.breakpointObserver.isMatched([
      Breakpoints.XSmall,
      Breakpoints.Small
    ]);

    if (isSmallScreen) {
      this.openMobileDialog();
      return;
    }

    const dialogRef = this.dialog.open<string | undefined>(AppDialogAddTodoComponent, {
      width: '800px',
    });

    dialogRef.closed.subscribe(label => {
      if (label !== undefined) {
        this.store.dispatch(actionTodoAdd({label}));
      }
    });
  }

  public toggleTodo(todo: Todo, checked: boolean): void {
    this.store.dispatch(actionTodoSet({id: todo.id, label: todo.label, done: checked}));
  }

  public delete(todo: Todo): void {
    this.store.dispatch(actionTodoDelete({id: todo.id}));
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
