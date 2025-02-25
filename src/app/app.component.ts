import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatCard,  } from '@angular/material/card';
import { MatCardContent } from '@angular/material/card';

import { animate, style, transition, trigger } from '@angular/animations';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    RouterOutlet,
    MatToolbar,
    MatCard,
    MatIcon
    
],
animations: [
  trigger('fadeIn', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateY(-20px)' }),
      animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
    ])
  ])
]

})
export class AppComponent {
  title = 'Gestor_Tareas';
}
