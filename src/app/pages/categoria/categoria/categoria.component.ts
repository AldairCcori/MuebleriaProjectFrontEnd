import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/categoria';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { TokenService } from 'src/app/services/user/token.service';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css'],
})
export class CategoriaComponent implements OnInit {
  categoria: Categoria[];
  isAdmin = false;

  categoriaSeleccionada: Categoria;
  public categori: Categoria = new Categoria();

  constructor(
    private categoriaService: CategoriaService,
    public modalService: ModalService,
    private tokenService: TokenService,
    private activateRouter: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.listar();
    this.isAdmin = this.tokenService.isAdmin();
  }

  private listar() {
    this.categoriaService.getCategorias().subscribe((dato) => {
      this.categoria = dato;
    });
  }

  deleteProducto(categoria: Categoria): void {
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
        text: `Seguro que quiere eliminar el producto ${categoria.descripcion}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.categoriaService
            .deleteCategoria(categoria.id)
            .subscribe((reponse) => {
              this.categoria = this.categoria.filter(
                (pro) => pro !== categoria
              );
              swalWithBootstrapButtons.fire(
                'Eliminado',
                'Eliminaste la categoria con exito!!',
                'success'
              );
            });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'Tu categoria no se elimino :)',
            'error'
          );
        }
      });
  }
}
