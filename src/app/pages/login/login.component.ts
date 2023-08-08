import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { data, error } from 'jquery';
import { LoginUsuario } from 'src/app/models/login-usuario';
import { LoginService } from 'src/app/services/login/login.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { AuthService } from 'src/app/services/user/auth.service';
import { TokenService } from 'src/app/services/user/token.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginData = {
    username: '',
    password: '',
  };

  loginUsuario: LoginUsuario;
  nombreUsuario: string;
  password: string;
  errMsj: string;

  constructor(
    private snack: MatSnackBar,
    private loginService: LoginService,
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    public modalService: ModalService
  ) {}

  ngOnInit(): void {}

  onLogin(): void {
    this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.password);

    localStorage.setItem('usu', this.nombreUsuario);
    this.authService.login(this.loginUsuario).subscribe(
      (data) => {
        this.tokenService.setToken(data.token);
        swal.fire('Bienvenido', 'Iniciaste Sesion con exito', 'success');
        this.router.navigate(['/']);
      },
      (err) => {
        swal.fire('Usuario no registrado', 'error');
        this.errMsj = err.error.message;
        console.log(err.error.message);
      }
    );
  }

  cerrarModal() {
    this.modalService.cerrarModal();
  }

  // formSubmit(): void {
  //   if (
  //     this.loginData.username.trim() == '' ||
  //     this.loginData.username.trim() == null
  //   ) {
  //     this.snack.open('el nombre de usuario es requerido', 'Aceptar', {
  //       duration: 3000,
  //     });
  //     return;
  //   }
  //   if (
  //     this.loginData.password.trim() == '' ||
  //     this.loginData.password.trim() == null
  //   ) {
  //     this.snack.open('el password de usuario es requerido', 'Aceptar', {
  //       duration: 3000,
  //     });
  //     return;
  //   }
  // }
}
