import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import { AppState } from '../core/core.state';
import { Store } from '@ngrx/store';
import { actionAuthSetTokens } from '../core/auth/auth.actions';
import { Tokens } from '../core/auth/auth.models';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
//Formbuilder a créer formulaire JS
export class HomePage {
  form: FormGroup; // Variable du formulaire créé

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private store: Store<AppState>
  ) {
    this.form = this.formBuilder.group({
      email: ['wajih@doinsport.com', [Validators.required, Validators.email]],
      password: ['doinsport', [Validators.required]],
    });
  }

  onSubmit() {
    const body = {
      username: this.form.get('email').value,
      password: this.form.get('password').value,
    };
    this.http
      .post<Tokens>('https://test.kmedini.fr/auth/signin', body)
      .pipe(
        tap({
          error: async (err: any) => {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 401 || err.status === 204) {
                const toast = await this.toastController.create({
                  message: 'Impposible de ce connecter',
                  duration: 1500,
                  position: 'top',
                });
              }
            }
          },
        })
      )
      .subscribe((tokens) => {
        console.log(tokens);
        this.store.dispatch(actionAuthSetTokens({ tokens }));
      });
  }
}
