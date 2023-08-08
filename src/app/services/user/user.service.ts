import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baseUrl from '../helper';
import { Observable, filter } from 'rxjs';
import { User } from 'src/app/models/user';
import { EmptyExpr } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url: string = 'http://localhost:8080/auth/user';
  constructor(private httpClient: HttpClient) {}

  public registrarUsuario(user: any) {
    return this.httpClient.post(`${baseUrl}/api/usuario`, user);
  }

  getUser(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.url}`);
  }

  getUserId(nombreUsuario: string): any {
    return this.httpClient
      .get<User[]>(`${this.url}`)
      .forEach((users) =>
        users.filter((users) => users.nombreUsuario === nombreUsuario)
      );
  }
}
