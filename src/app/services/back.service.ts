import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class BackService {

  private url: String;

  constructor(public http: HttpClient) {
    this.url = environment.apiUrl;
  }


  findAllCitas(): Observable<any> {
    let ruta = `${this.url}cita`;
    return this.http.get(ruta);
  }

  findAllConsultorios(): Observable<any> {
    let ruta = `${this.url}consultorio`;
    return this.http.get(ruta);
  }

  findAllDoctores(): Observable<any> {
    let ruta = `${this.url}doctor`;
    return this.http.get(ruta);
  }

  save(form: any): Observable<any> {
    let params = JSON.stringify(form);
    let headersResp = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(`${this.url}cita`, params, { headers: headersResp }).pipe(
      catchError(err => of(err))
    );
  }

  cancelar(id: number): Observable<any> {
    let ruta = `${this.url}cita/${id}`;
    return this.http.delete(ruta);
  }

}
