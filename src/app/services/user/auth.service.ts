import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user';
import { Observable } from 'rxjs';
import { LoginUsuario } from 'src/app/models/login-usuario';
import { JwtDTO } from 'src/app/models/jwt-dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authURL = 'http://localhost:8080/auth/';

  constructor(private httpClient: HttpClient) {}

  public nuevo(user: User): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'nuevo', user);
  }

  public login(loginUser: LoginUsuario): Observable<JwtDTO> {
    return this.httpClient.post<JwtDTO>(this.authURL + 'login', loginUser);
  }
}
