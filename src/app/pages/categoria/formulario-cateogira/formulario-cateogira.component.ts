import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { Categoria } from 'src/app/models/categoria';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
  selector: 'app-formulario-cateogira',
  templateUrl: './formulario-cateogira.component.html',
  styleUrls: ['./formulario-cateogira.component.css'],
})
export class FormularioCateogiraComponent implements OnInit {
  public categoria: Categoria = new Categoria();

  constructor(
    private categoriaService: CategoriaService,
    private router: Router,
    private activateRouter: ActivatedRoute,
    public modalService: ModalService
  ) {}

  ngOnInit(): void {
    //this.cargarCategoria();
    this.activateRouter.params.subscribe((params) => {
      let id = params['id'];
      this.categoria.id = id;
      console.log('Id' + id);
    });
  }

  public createCategoria(): void {
    this.categoriaService
      .getSaveCategorias(this.categoria)
      .subscribe((categoria) => {
        this.router.navigate(['/categoria']);
        swal.fire('nuev Categoria', `Categoria guardado con exito`, 'success');
      });
  }

  cargarCategoria(): void {
    this.activateRouter.params.subscribe((params) => {
      let id = params['id'];
      if (id) {
        this.categoriaService
          .getCategoriaUpdate(id)
          .subscribe((categoria) => (this.categoria = categoria));
      }
    });
  }

  updateCategoria(): void {
    this.categoriaService
      .updateCategoria(this.categoria)
      .subscribe((categoria) => {
        this.router.navigate(['/categoria']);
        swal.fire(
          'Categoria Actualizada',
          'Categoria actualizado con exito',
          'success'
        );
      });
  }

  cerrarModal() {
    this.modalService.cerrarModal();
  }
}
