import { Injectable } from '@angular/core';
import { Lista } from '../models/Lista.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  listas: Lista[] = [];

  constructor() {
    this.getStorage();
  }

  createList(titulo: string) {
    const list = new Lista(titulo);
    this.listas.push(list);
    this.saveStorage();

    return list.id;
  }

  deleteList(lista: Lista): void {
    this.listas = this.listas.filter(listaData => listaData.id !== lista.id);
    this.saveStorage();
  }

  updateList(lista: Lista) {

  }

  getList(id: string | number) {
    id = Number(id);
    return this.listas.find(listaData => listaData.id === id);
  }

  saveStorage() {
    localStorage.setItem('data', JSON.stringify(this.listas));
  }

  getStorage() {
    if (localStorage.getItem('data')) {
      this.listas = JSON.parse(localStorage.getItem('data'));
    } else {
      this.listas = [];
    }
  }

}
