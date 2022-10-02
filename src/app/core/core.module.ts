import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf, ErrorHandler } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  StoreRouterConnectingModule,
  RouterStateSerializer,
} from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { FormsModule } from '@angular/forms';

import {
  AppState,
  reducers,
  metaReducers,
  selectRouterState,
} from './core.state';
import { AuthEffects } from './auth/auth.effects';
import { selectIsAuthenticated, selectAuth } from './auth/auth.selectors';
import { authLogin, authLogout } from './auth/auth.actions';
import { AuthGuardService } from './auth/auth-guard.service';
import { AppErrorHandler } from './error-handler/app-error-handler.service';
import { CustomSerializer } from './router/custom-serializer';
import { HttpErrorInterceptor } from './http-interceptors/http-error.interceptor';
import { TodoEffects } from './todo/todo.effects';

export {
  selectAuth,
  authLogin,
  authLogout,
  AppState,
  selectIsAuthenticated,
  AuthGuardService,
  selectRouterState,
};

@NgModule({
  imports: [
    // angular
    CommonModule,
    HttpClientModule,
    FormsModule,

    // ngrx
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([AuthEffects, TodoEffects]),

    // 3rd party
  ],
  declarations: [],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: ErrorHandler, useClass: AppErrorHandler },
    { provide: RouterStateSerializer, useClass: CustomSerializer },
  ],
  exports: [
    // angular
    FormsModule,

    // 3rd party
  ],
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
