import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss'],
})
export class ModalFormComponent implements OnInit {
  
  public task = {
    taskName: null,
    done: false
  };
  
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  validateForm() {
    // Fermer la fenêtre et envoyer les données
    this.modalCtrl.dismiss(this.task);
  }
}
