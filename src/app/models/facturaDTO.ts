import { factura } from './factura';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class facturaDTO {
  public factura: factura;

  setFactura(facture: factura) {
    this.factura = facture;
  }
  getFactura() {
    return this.factura;
  }
}
