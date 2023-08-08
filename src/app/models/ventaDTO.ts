import { ProductInterceptorService } from '../services/interceptors/product-interceptor.service';
import { Product } from './product';
import { User } from './user';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VentaDTO {
  public usuario: User;
  public productos: Product[];
  public id: number;
  public createAt: string;
  public nombre: string;
  public runUsuario: string;
  public apellidoCliente: string;
  public direccion: string;
  public telefono: string;

  getId() {
    return this.id;
  }
  getcreateAt() {
    return this.createAt;
  }
  getNombre() {
    return this.nombre;
  }

  getRunUsuario() {
    return this.runUsuario;
  }

  getApellido() {
    return this.apellidoCliente;
  }
  getDireccion() {
    return this.direccion;
  }
  getTelefono() {
    return this.telefono;
  }

  setUser(usuario: User) {
    this.usuario = usuario;
  }
  getUser() {
    return this.usuario;
  }

  setProductos(productos: Product[]) {
    this.productos = productos;
  }
  getProductos() {
    return this.productos;
  }
}
