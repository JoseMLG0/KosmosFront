import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


export const routes: Routes = [
  {
    path: 'crear-cita',
    loadComponent: () =>
      import('./modules/crear-cita/crear-cita.component').then(
        (m) => m.CrearCitaComponent
      ),
  },
  {
    path: 'visualizar-datos',
    loadComponent: () =>
      import('./modules/visualizar-datos/visualizar-datos.component').then(
        (m) => m.VisualizarDatosComponent
      ),
  },
  { path: '', redirectTo: '/visualizar-datos', pathMatch: 'full' },
  { path: '**', redirectTo: '/visualizar-datos' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
