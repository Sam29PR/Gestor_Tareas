import { Component, OnInit, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TaskService, Task } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatToolbar } from '@angular/material/toolbar';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';

@Component({
  standalone: true,
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatCheckboxModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatToolbar,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    
    
  ],
})
export class TaskListComponent implements OnInit {
  tareaEditandoId: number | null = null;
  tareas: Task[] = [];

  // Controles reactivos
  nuevaTareaControl = new FormControl('');
  edicionControl = new FormControl('');
  filtroControl = new FormControl('todas');

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    // Suscribirse a los cambios en las tareas
    this.taskService.tareas$.subscribe((tareas) => {
      this.tareas = tareas;
    });
  }

  // Obtener tareas filtradas
  get tareasFiltradas() {
    if (this.filtroControl.value === 'completadas') {
      return this.tareas.filter((t) => t.completada);
    } else if (this.filtroControl.value === 'pendientes') {
      return this.tareas.filter((t) => !t.completada);
    }
    return this.tareas;
  }

  // Agregar una nueva tarea
  agregarTarea() {
    const nombre = this.nuevaTareaControl.value?.trim();
    if (nombre) {
      this.taskService.agregarTarea(nombre);
      this.nuevaTareaControl.reset();
    }
  }

  // Editar una tarea
  editarTarea(tarea: Task) {
    this.tareaEditandoId = tarea.id;
    this.edicionControl.setValue(tarea.nombre);
  }

  // Guardar la edición de una tarea
  guardarEdicion(tarea: Task) {
    const nombre = this.edicionControl.value?.trim();
    if (nombre) {
      tarea.nombre = nombre;
      this.taskService.actualizarTarea(tarea.id, tarea);
      this.tareaEditandoId = null; // Salir del modo edición
    }
  }

  // Eliminar una tarea
  eliminarTarea(id: number) {
    this.taskService.eliminarTarea(id);
  }

  // Actualizar el estado de una tarea (completada/pendiente)
  actualizarTarea(tarea: Task) {
    tarea.completada = !tarea.completada;
    this.taskService.actualizarTarea(tarea.id, tarea);
  }
}