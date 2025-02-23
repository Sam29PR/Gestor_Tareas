import { Injectable,PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { platform } from 'os';


export interface Task {
  id: number;
  nombre: string;
  completada: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tareas: Task[] = [];
  private tareasSubject = new BehaviorSubject<Task[]>(this.tareas);
  tareas$ = this.tareasSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    if (isPlatformBrowser(this.platformId)) {
      this.cargarTareasDesdeLocalStorage(); // 
    }
  }

  private guardarEnLocalStorage() {
    localStorage.setItem('tareas', JSON.stringify(this.tareas));
  }

  private cargarTareasDesdeLocalStorage() {
    if (isPlatformBrowser(this.platformId)){
      const tareasGuardadas = localStorage.getItem('tareas');
      if (tareasGuardadas) {
        this.tareas = JSON.parse(tareasGuardadas);
        this.tareasSubject.next(this.tareas);
      }
    }
  }

  agregarTarea(nombre: string) {
    const nuevaTarea: Task = {
      id: this.tareas.length + 1,
      nombre,
      completada: false
    };
    this.tareas.push(nuevaTarea);
    this.tareasSubject.next([...this.tareas]);
    this.guardarEnLocalStorage();
  }

  eliminarTarea(id: number) {
    this.tareas = this.tareas.filter(t => t.id !== id);
    this.tareasSubject.next([...this.tareas]);
    this.guardarEnLocalStorage();
  }

  actualizarTarea(id: number, nuevaTarea: Task) {
    this.tareas = this.tareas.map(t => (t.id === id ? nuevaTarea : t));
    this.tareasSubject.next([...this.tareas]);
    this.guardarEnLocalStorage();
  }
}
