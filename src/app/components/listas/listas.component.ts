import { Component, Input, ViewChild } from '@angular/core';
import { Lista } from 'src/app/models/Lista.model';
import { TasksService } from 'src/app/services/tasks.service';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent {

  @Input() completed: boolean = false;
  @ViewChild(IonList) listaIon: IonList;

  constructor(public _service: TasksService, private router: Router, private alert: AlertController) { }

  listaSelect(lista: Lista) {
    if (this.completed) {
      this.router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`);
    } else {
      this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
    }
  }

  deleteList(lista: Lista): void {
    this._service.deleteList(lista);
  }

  async updateList(lista: Lista) {
    const alert = await this.alert.create({
      header: 'Actualizar Lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: lista.titulo,
          placeholder: 'Nombre de la Lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => this.listaIon.closeSlidingItems()
        },
        {
          text: 'Actualizar',
          handler: data => {
            if (data.titulo.length === 0) {
              this.listaIon.closeSlidingItems();
              return;
            }
            lista.titulo = data.titulo;
            this._service.saveStorage();
            this.listaIon.closeSlidingItems();
          }
        }
      ]
    })

    await alert.present();
  }

}
