import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalFormComponent } from '../modal-form/modal-form.component';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;
const STORAGE_KEY = "taskList";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.page.html',
  styleUrls: ['./todo-list.page.scss'],
})
export class TodoListPage implements OnInit {

  public taskList = [
    {
      taskName: 'Nétoyer les écuries d\'Augilas',
      done: false,
      id: 1
    },
    {
      taskName: 'Résoudre le problème de réchauffement climatique',
      done: true,
      id: 2
    }
  ];

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    Storage.get({ key: STORAGE_KEY }).then(
      (data: any) => {
        console.log(data.value);
        this.taskList = JSON.parse(data.value) || [];
      }
    )
  }

  async addTask() {
    const modal = await this.modalCtrl.create({
      component: ModalFormComponent

    });
    modal.onDidDismiss().then(
      (res: any) => {
        res.data.id = (new Date()).getTime();
        console.log(res);
        if (res.data.taskName && res.data.taskName.trim() != "") {
          this.taskList.push(res.data);

          this.persist();
        }
      }
    )
    modal.present();
  }

  public persist() {
    Storage.set({
      key: STORAGE_KEY,
      value: JSON.stringify(this.taskList)
    });
  }
}
