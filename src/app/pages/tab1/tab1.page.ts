import { Component } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public _service: TasksService, private router: Router, private alert: AlertController) { }

  async addList() {
    const alert = await this.alert.create({
      header: 'Nueva Lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Nombre de la Lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Crear',
          handler: data => {
            if (data.titulo.length === 0) {
              return;
            }
            const id = this._service.createList(data.titulo);
            this.router.navigateByUrl(`/tabs/tab1/agregar/${id}`);
          }
        }
      ]
    })

    await alert.present();
  }

}
