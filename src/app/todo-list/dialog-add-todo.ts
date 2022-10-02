import { Component } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';


@Component({
  selector: 'app-dialog-add-todo',
  template: `
  <h1 style="text-align=center">Ajouter un Todo</h1>
  <div>
    <ion-item>
      <ion-textarea #label rows="6" cols="20" placeholder="Ajouter une nouvelle tâche à réaliser"></ion-textarea>
    </ion-item>
  </div>
  <div style="margin-top: 20px">
    <ion-button class="modal-button" (click)="dialogRef.close(label.value)">Enregistrer</ion-button>
    <ion-button class="modal-button" (click)="dialogRef.close()">Annuler</ion-button>
  </div>
  `,
  styles: [`
    :host {
      display: block;
      background: #fff;
      border-radius: 8px;
      padding: 8px 16px 16px;
    }
    .modal-button {
      min-width: 110px;
    }
  `],
})
export class AppDialogAddTodoComponent {
  constructor(public dialogRef: DialogRef<string>) { }
}
