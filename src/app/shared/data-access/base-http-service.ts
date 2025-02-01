import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BaseHttpService {
  protected http = inject(HttpClient); // Usa 'protected' para permitir el acceso en clases derivadas
  protected apiUrl = environment.API_URL; // Usa 'protected' para permitir el acceso en clases derivadas
}
