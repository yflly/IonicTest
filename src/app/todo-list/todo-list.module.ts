import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { DialogModule } from '@angular/cdk/dialog';
import { LayoutModule } from '@angular/cdk/layout';
import { TodoListPage } from './todo-list.page';
import { TodoListPageRoutingModule } from './todo-list-routing.module';
import { AppMobileDialogAddTodoComponent } from './mobile-dialog-add-todo';
import { AppDialogAddTodoComponent } from './dialog-add-todo';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DialogModule,
    LayoutModule,
    TodoListPageRoutingModule
  ],
  declarations: [TodoListPage, AppDialogAddTodoComponent, AppMobileDialogAddTodoComponent]
})
export class TodoListPageModule {}
