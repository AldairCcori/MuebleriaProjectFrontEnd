import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/user/auth.service';
import { TokenService } from 'src/app/services/user/token.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user/user.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  isRegister = false;
  isRegisterFail = false;
  nuevoUsuario: User;
  id: number;
  nombre: string;
  nombreUsuario: string;
  email: string;
  password: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  direccion: string;
  telefono: string;
  errMsj: string;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onRegister(): void {
    this.nuevoUsuario = new User(
      this.id,
      this.nombre,
      this.nombreUsuario,
      this.email,
      this.password,
      this.apellidoPaterno,
      this.apellidoMaterno,
      this.direccion,
      this.telefono
    );
    this.authService.nuevo(this.nuevoUsuario).subscribe(
      (data) => {
        swal.fire('Registrado', 'Te registraste exitosamente', 'success');
        this.router.navigate(['/login']);
      },
      (err) => {
        this.errMsj = err.error.message;
        console.log(err.error.message);
      }
    );
  }
}
