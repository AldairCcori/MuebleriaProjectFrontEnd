import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper';
import {
  Observable,
  of,
  map,
  catchError,
  throwError,
  BehaviorSubject,
} from 'rxjs';
import { Product } from 'src/app/models/product';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/models/categoria';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private url: string = 'http://localhost:8080/api/productos';

  //lista carrito
  private mylist: Product[] = [];

  //carrito observable
  private mycart = new BehaviorSubject<Product[]>([]);
  myCart$ = this.mycart.asObservable();

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private httpClient: HttpClient, private router: Router) {}

  addProductCart(producto: Product) {
    if (this.mylist.length === 0) {
      producto.cantidad = 1;
      this.mylist.push(producto);
      this.mycart.next(this.mylist);
    } else {
      const productMod = this.mylist.find((elemento) => {
        return elemento.id === producto.id;
      });
      if (productMod) {
        productMod.cantidad = productMod.cantidad + 1;
        this.mycart.next(this.mylist);
      } else {
        producto.cantidad = 1;
        this.mylist.push(producto);
        this.mycart.next(this.mylist);
      }
    }
  }

  deleteProducto(id: number) {
    this.mylist = this.mylist.filter((product) => {
      return product.id != id;
    });
    this.mycart.next(this.mylist);
  }

  buscarProductId(id: number) {
    return this.mylist.find((elemento) => {
      return elemento.id === id;
    });
  }

  totalCart() {
    const total = this.mylist.reduce(function (acc, product) {
      return acc + product.cantidad * product.precio;
    }, 0);
    return total;
  }
}
