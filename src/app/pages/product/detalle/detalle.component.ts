import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../../models/product';
import { ProductService } from 'src/app/services/product/product.service';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { ModalService } from 'src/app/services/modal/modal.service';
import { Categoria } from 'src/app/models/categoria';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css'],
})
export class DetalleComponent implements OnInit {
  @Input() producto: Product;
  imagenSelecciona: File;
  public categoria: Categoria;

  constructor(
    private productoService: ProductService,
    private activatedRoute: ActivatedRoute,
    public modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      let id = params.get('id');
      if (id) {
        this.productoService.getProduct(id).subscribe((producto) => {
          this.producto = producto;
          this.categoria = producto.categoriaProducto;
        });
      }
    });
    //this.foto();
  }

  seleccionarFoto(event: any) {
    this.imagenSelecciona = event.target.files[0];
    console.log(this.imagenSelecciona);
    if (this.imagenSelecciona.type.indexOf('image') < 0) {
      swal.fire('error', 'seleciona una imagen valida', 'success');
    }
  }

  subirFoto() {
    if (!this.imagenSelecciona) {
      swal.fire('error', 'debes seleccionar una foto', 'error');
    } else {
      this.productoService
        .subirFoto(this.imagenSelecciona, this.producto.id)
        .subscribe((producto) => {
          this.producto = producto;

          this.modalService.notificarUpload.emit(this.producto);

          swal.fire('Subida', 'la foto se subio exitosamente', 'success');
        });
    }
  }

  cerrarModal() {
    this.modalService.cerrarModal();
  }

  // foto(): void {
  //   this.activatedRoute.paramMap.subscribe((params) => {
  //     let id = params.get('id');
  //     if (id) {
  //       this.productoService.getProduct(id).subscribe((producto) => {
  //         this.producto = producto;
  //       });
  //     }
  //   });
  // }
}
