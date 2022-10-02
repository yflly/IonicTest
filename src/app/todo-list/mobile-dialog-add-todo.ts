import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-mobile-dialog-add-todo',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Ajouter un Todo</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="cancel()">Annuler</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-item>
        <ion-textarea #label rows="6" cols="20" placeholder="Ajouter une nouvelle tâche à réaliser"></ion-textarea>
      </ion-item>
      <ion-button (click)="add(label.value)" expand="block">Enregistrer</ion-button>
    </ion-content>
  `,
})
export class AppMobileDialogAddTodoComponent {

  constructor(private modalCtrl: ModalController) { }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  add(value) {
    return this.modalCtrl.dismiss(value, 'add');
  }
}
