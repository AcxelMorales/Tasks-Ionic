import { Component, ViewChild } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { ActivatedRoute } from '@angular/router';
import { Lista } from 'src/app/models/Lista.model';
import { ListaItem } from 'src/app/models/Lista-item.model';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage {

  @ViewChild('ionlist') listaIon: IonList;

  lista: Lista;
  nombreItem: string;

  constructor(public _service: TasksService, private route: ActivatedRoute, private alert: AlertController) {
    const id = this.route.snapshot.paramMap.get('listaid');
    this.lista = this._service.getList(id);
  }

  addItem() {
    if (this.nombreItem.length === 0) return;
    const item = new ListaItem(this.nombreItem);
    this.lista.items.push(item);
    this.nombreItem = '';
    this._service.saveStorage();
  }

  delete(id: any) {
    this.lista.items.splice(id, 1);
    this._service.saveStorage();
  }

  changeCheck(item: ListaItem) {
    const pendientes = this.lista.items.filter(itemData => !itemData.state).length;
    if (pendientes === 0) {
      this.lista.terminadaEn = new Date();
      this.lista.completada = true;
    } else {
      this.lista.terminadaEn = null;
      this.lista.completada = false;
    }

    this._service.saveStorage();
    console.log(this._service.listas);
  }

  async updateItem(item: ListaItem) {
    const alert = await this.alert.create({
      header: 'Actualizar Tarea',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: item.desc,
          placeholder: 'Nombre de la Tarea'
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
            item.desc = data.titulo;
            this._service.saveStorage();
            this.listaIon.closeSlidingItems();
          }
        }
      ]
    })

    await alert.present();
  }

}
