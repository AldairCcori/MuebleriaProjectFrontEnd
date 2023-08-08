import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from 'src/app/services/product/product.service';
import swal from 'sweetalert2';
import { tap } from 'rxjs';
import { ModalService } from 'src/app/services/modal/modal.service';
import { TokenService } from 'src/app/services/user/token.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  public producto: Product[];
  isAdmin = false;

  productoSeleccionado: Product;

  constructor(
    private productService: ProductService,
    public modalService: ModalService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.listar();
    this.isAdmin = this.tokenService.isAdmin();

    this.modalService.notificarUpload.subscribe((productos) => {
      this.producto = this.producto.map((productoOriginal) => {
        if (productos.id == productoOriginal.id) {
          productoOriginal.imagen = productos.imagen;
        }
        return productoOriginal;
      });
    });
  }

  private actualizarFotoListado() {
    this.modalService.notificarUpload.subscribe((productos) => {
      this.producto = this.producto.map((productoOriginal) => {
        if (productos.id == productoOriginal.id) {
          productoOriginal.imagen = productos.imagen;
        }
        return productoOriginal;
      });
    });
  }

  //Metodo para listar los productos en la tabla principal de todo los productos
  private listar() {
    this.productService.getProducts().subscribe((dato) => {
      this.producto = dato;
    });
  }

  //Metodo para eliminar los productos de la tabla o lista principal
  deleteProducto(producto: Product): void {
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Esta seguro',
        text: `Seguro que quiere eliminar el producto ${producto.nombre}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.productService
            .deletaProduct(producto.id)
            .subscribe((reponse) => {
              this.producto = this.producto.filter((pro) => pro !== producto);
              swalWithBootstrapButtons.fire(
                'Eliminado',
                'Eliminaste el producto con exito!!',
                'success'
              );
            });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'Tu producto no se elimino :)',
            'error'
          );
        }
      });
  }

  abrirModal(producto: Product) {
    this.productoSeleccionado = producto;
    this.modalService.abrirModal();
  }
}
