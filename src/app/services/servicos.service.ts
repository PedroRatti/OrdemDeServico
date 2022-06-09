import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Servicos } from '../models/servicos';

@Injectable({
  providedIn: 'root'
})
export class ServicosService {

  baseUrl: String = environment.baseUrl;

  constructor(
    private http : HttpClient,
    private snack: MatSnackBar) { }

  findAll():Observable<Servicos[]> {
    const url = this.baseUrl + "/servicos";
    return this.http.get<Servicos[]>(url);
  }

  findById(id : any):Observable<Servicos> {
    const url = this.baseUrl + "/servicos/" + id;
    return this.http.get<Servicos>(url);
  }

  create(servicos: Servicos):Observable<Servicos> {
    const url = this.baseUrl + "/servicos";
    return this.http.post<Servicos>(url, servicos);
  }

  update(servicos: Servicos):Observable<Servicos> {
    const url = this.baseUrl + "/servicos/" + servicos.id;
    return this.http.put<Servicos>(url, servicos);
  }

  delete(id : any):Observable<void> {
    const url = `${this.baseUrl}/servicos/${id}`;
    return this.http.delete<void>(url);
  }

  message(msg : String): void {
    this.snack.open(`${msg}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 4000
    })
  }
}
