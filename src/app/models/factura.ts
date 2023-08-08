import { ProductInterceptorService } from '../services/interceptors/product-interceptor.service';
import { Product } from './product';
import { User } from './user';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class factura {
  id: number;
  createAt: string;
  nombre: string;
  runUsuario: string;
  apellidoCliente: string;
  direccion: string;
  telefono: string;
  usuario: User;
  productos: Product[];

  constructor() {}
  /*
  setTelefono(telefono: string) {
    this.telefono = telefono;
  }
  getTelefono() {
    return this.telefono;
  }

  setDireccion(direccion: string) {
    this.direccion = direccion;
  }
  getDireccion() {
    return this.direccion;
  }

  setApellidoCliente(apellidoCliente: string) {
    this.apellidoCliente = apellidoCliente;
  }
  getApellidoCliente() {
    return this.apellidoCliente;
  }

  setId(id: number) {
    this.id = id;
  }

  getId() {
    return this.id;
  }

  setCreateAt(createAt: string) {
    this.createAt = createAt;
  }

  getCreateAt() {
    return this.createAt;
  }

  setNombre(nombre: string) {
    this.nombre = nombre;
  }
  getNombre() {
    return this.nombre;
  }

  setRunUsuario(runUsuario: string) {
    this.runUsuario = runUsuario;
  }
  getRunUsuario() {
    return this.runUsuario;
  }

  setUsuario(usuario: User) {
    this.usuario = usuario;
  }
  getUsuario() {
    return this.usuario;
  }

  setProductos(productos: Product[]) {
    this.productos = productos;
  }
  getProductos() {
    return this.productos;
  }*/
}
