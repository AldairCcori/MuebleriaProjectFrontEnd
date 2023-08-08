import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import {
  Observable,
  of,
  map,
  catchError,
  throwError,
  BehaviorSubject,
} from 'rxjs';
import { facturaDTO } from 'src/app/models/facturaDTO';
import { factura } from '../../../models/factura';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css'],
})
export class FacturaComponent implements OnInit {
  constructor(private factura: factura) {}
  nombreCliente: string;
  rutCliente: string;
  apellidoCliente: string;
  direccion: string;
  telefonoCliente: string;
  correoCliente: string;
  detalle: any[];
  total: number;
  id: number;
  createAt: string;

  ngOnInit(): void {
    console.log('XXX' + localStorage.getItem('facture'));

    var response = JSON.parse(localStorage.getItem('facture')!);

    /*
     id: number;
  createAt: string;
  nombre: string;
  runUsuario: string;
  apellidoCliente: string;
  direccion: string;
  telefono: string;
  usuario: User;
  productos: Product[];
    */

    console.log('response*** ...' + JSON.stringify(response));
    this.nombreCliente = response.nombre;
    this.rutCliente = response.runUsuario;
    this.apellidoCliente = response.apellidoCliente;
    this.telefonoCliente = response.telefono;
    this.correoCliente = response.usuario.email;
    this.detalle = response.detalleFacturas;
    this.id = response.id;
    this.createAt = response.createAt;
    this.direccion = response.direccion;

    let total = 0;
    for (let o of this.detalle) {
      total = total + o.cantidad * o.precio;
    }
    this.total = total;
    console.log('TOTAL ' + total);
    console.log('DEATALLE' + JSON.stringify(response.detalleFacturas));
  }
}
