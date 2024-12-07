import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { BackService } from '../../services/back.service';
import { CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-visualizar-datos',
  standalone: true,
  imports: [CommonModule, MatTableModule,
    MatButtonModule,
    MatIconModule,],
  providers: [DatePipe],
  templateUrl: './visualizar-datos.component.html',
  styleUrl: './visualizar-datos.component.scss',
})
export class VisualizarDatosComponent {
  displayedColumns: string[] = ['nombre', 'consultorio', 'doctor', 'fecha', 'cancelar'];
  citas: any = [];

  constructor(private backService: BackService, private router: Router) {
    this.cargarCitas();
  }

  private async cargarCitas() {
    const data$ = this.backService.findAllCitas();
    const data = await lastValueFrom(data$);

    this.citas = data;
  }

  public async cancelarCita(id: any) {
    const data$ = this.backService.cancelar(id);
    const data = await lastValueFrom(data$);
    this.cargarCitas();
  }
}
