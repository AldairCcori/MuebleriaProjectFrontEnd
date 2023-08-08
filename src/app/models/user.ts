export class User {
  id: number;
  nombre: string;
  nombreUsuario: string;
  email: string;
  password: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  telefono: string;
  direccion: string;

  constructor(
    id: number,
    nombre: string,
    nombreUsuario: string,
    email: string,
    password: string,
    apellidoPaterno: string,
    apellidoMaterno: string,
    telefono: string,
    direccion: string
  ) {
    this.id = id;
    this.nombre = nombre;
    this.nombreUsuario = nombreUsuario;
    this.email = email;
    this.password = password;
    this.apellidoPaterno = apellidoPaterno;
    this.apellidoMaterno = apellidoMaterno;
    this.telefono = telefono;
    this.direccion = direccion;
  }
}
