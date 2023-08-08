import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { CartService } from 'src/app/services/cart/cart.service';
import { ProductService } from 'src/app/services/product/product.service';
import { AuthService } from 'src/app/services/user/auth.service';
import { SaleServiceService } from 'src/app/services/sale/sale-service.service';

import {
  Observable,
  of,
  map,
  catchError,
  throwError,
  BehaviorSubject,
} from 'rxjs';
import { VentaDTO } from 'src/app/models/ventaDTO';
import { factura } from 'src/app/models/factura';
import { UserService } from 'src/app/services/user/user.service';
import { FactoryTarget } from '@angular/compiler';
import { FacturaComponent } from '../factura/factura/factura.component';
import { facturaDTO } from '../../models/facturaDTO';
import { data, event } from 'jquery';
import { ContentObserver } from '@angular/cdk/observers';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  productos: Product[] = [];
  myCart$ = this.cartService.myCart$;
  user: User[] = [];
  isUserAuthenticated = false;
  venta: VentaDTO;

  id: number;
  isRegister = false;
  isRegisterFail = false;
  nuevoUsuario: User;
  nombre: string;
  rutUsuario: string;
  email: string;
  password: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  direccion: string;
  telefono: string;
  errMsj: string;

  total: number;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService,
    private SaleServiceService: SaleServiceService,
    private router: Router,
    private userService: UserService,
    private ventaDTO: VentaDTO,
    private factura: factura,
    private facturaDTO: facturaDTO
  ) {}

  ngOnInit(): void {
    //this.cargarCarrito();
    //this.guardarCarrito();

    if (localStorage.getItem('usu') != '') {
      this.isUserAuthenticated = true;

      const username = localStorage.getItem('usu');
      this.userService.getUser().subscribe((dato) => {
        console.log('datos obtenidos desde backedn++++' + JSON.stringify(dato));
        this.user = dato;
        const selectedUser = this.user.find(
          (user) => user.nombreUsuario === username
        );
        if (selectedUser) {
          this.id = selectedUser.id;
          this.rutUsuario = selectedUser.nombreUsuario + ' ';
          selectedUser.apellidoPaterno + ' ';
          selectedUser.apellidoMaterno;
          this.apellidoPaterno = selectedUser.apellidoPaterno;
          this.apellidoMaterno = selectedUser.apellidoMaterno;
          this.direccion = selectedUser.direccion;
          this.telefono = selectedUser.telefono;
          this.email = selectedUser.email;
          this.nombre = selectedUser.nombre + ' ';
          selectedUser.apellidoPaterno + ' ';
          selectedUser.apellidoMaterno;
          console.log(selectedUser);
        } else {
          this.id = 1.0;
          this.rutUsuario = '';
          this.direccion = '';
          this.telefono = '';
          this.email = '';
        }
      });
    } else {
      this.rutUsuario = 'Usuario genérico';
      this.direccion = 'Dirección genérica';
      this.telefono = 'Teléfono genérico';
      this.email = 'Correo genérico';
    }
  }

  totalCart() {
    const result = this.cartService.totalCart();
    return result;
  }

  actualizarUnidades(operacion: string, id: number) {
    const product = this.cartService.buscarProductId(id);
    if (product) {
      if (operacion === 'minus' && product.cantidad > 0) {
        product.cantidad = product.cantidad - 1;
      }
      if (operacion === 'add') {
        product.cantidad = product.cantidad + 1;
      }
      if (product.cantidad === 0) {
        this.deleteProduct(id);
      }
    }
  }

  calcularTotal(price: number, unidades: number) {
    return price * unidades;
  }

  deleteProduct(id: number) {
    this.cartService.deleteProducto(id);
  }

  private guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(this.productos));
  }

  private cargarCarrito() {
    const carrito = localStorage.getItem('carrito');
    if (carrito) {
      this.productos = JSON.parse(carrito);
    }
  }

  // buy() {
  //   this.router.navigate(['/factura']);
  //   console.log('Compra finalizada!');
  // }

  onSubmit(event: Event) {
    console.log('inrgese' + event.target);
  }
  buy(): void {
    //capturando id usuario

    this.ventaDTO.usuario = new User(
      this.id,
      this.nombre,
      this.rutUsuario,
      this.email,
      this.password,
      this.apellidoPaterno,
      this.apellidoMaterno,
      this.telefono,
      this.direccion
    );
    this.myCart$.forEach((p) => {
      this.ventaDTO.productos = p;
      return (this.productos = p);
    });

    this.SaleServiceService.vender(this.ventaDTO).subscribe((p) => {
      var response = JSON.stringify(p);
      this.factura = JSON.parse(response);
      console.log('t ' + JSON.stringify(this.factura));
      localStorage.setItem('facture', response);
      this.router.navigate(['/factura']);
    });
  }
}
