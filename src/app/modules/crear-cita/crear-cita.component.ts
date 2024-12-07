import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BackService } from '../../services/back.service';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-cita',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  templateUrl: './crear-cita.component.html',
  styleUrl: './crear-cita.component.scss',
})
export class CrearCitaComponent {
  citaForm: FormGroup;

  doctores: any = [];

  consultorios: any = [];

  constructor(private fb: FormBuilder, private backService: BackService, private router: Router) {
    this.citaForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      doctorId: ['', Validators.required],
      consultorioId: ['', Validators.required],
      hora: ['', Validators.required],
      fecha: ['', Validators.required],
    });

    this.cargarConsultorios();
    this.cargarDoctores();
  }

  private async cargarConsultorios() {
    const data$ = this.backService.findAllConsultorios();
    const data = await lastValueFrom(data$);

    this.consultorios = data;
  }

  private async cargarDoctores() {
    const data$ = this.backService.findAllDoctores();
    const data = await lastValueFrom(data$);

    this.doctores = data;
  }

  onSubmit() {
    const self = this;
    if (this.citaForm.valid) {
      this.backService.save(this.citaForm.getRawValue()).subscribe({
        next(value: any) {
          alert("Cita registrada con el ID: " + value.id)
          self.router.navigate(['/visualizar-datos']);
        },
        error(err: any) {
          console.log(err);
        },
      });
    }
  }
}
