import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product/product.service';
import { RouterModule, Router, ActivatedRoute, Routes } from '@angular/router';
import swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { event } from 'jquery';
import { Categoria } from 'src/app/models/categoria';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  public producto: Product = new Product();
  public categorias: Categoria[];

  private imagenSelecciona: File;

  constructor(
    private productService: ProductService,
    private categoriaService: CategoriaService,
    private router: Router,
    private activateRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cargarProducto();
    this.foto();
    this.cargarCategorias();
  }

  compararCategoria(o1: Categoria, o2: Categoria) {
    if (o1 == undefined && o2 == undefined) {
      return true;
    }
    return o1 == null || o2 == null ? false : o1.id === o2.id;
  }

  private cargarCategorias() {
    this.categoriaService.getCategorias().subscribe((dato) => {
      this.categorias = dato;
    });
  }

  seleccionarFoto(event: any) {
    this.imagenSelecciona = event.target.files[0];
    console.log(this.imagenSelecciona);
  }

  subirFoto() {
    this.productService
      .subirFoto(this.imagenSelecciona, this.producto.id)
      .subscribe((producto) => {
        this.producto = producto;
        swal.fire('Subida', 'la foto se subio exitosamente', 'success');
      });
  }

  foto(): void {
    this.activateRouter.paramMap.subscribe((params) => {
      let id = params.get('id');
      if (id) {
        this.productService.getProduct(id).subscribe((producto) => {
          this.producto = producto;
        });
      }
    });
  }

  //metodo para de guardar o crear producto para aplicarlo a la vista
  public create(): void {
    this.productService.getSaveProduct(this.producto).subscribe((producto) => {
      this.router.navigate(['/productos']);
      swal.fire('nuevo Producto', `Producto guardado con exito`, 'success');
    });
  }

  //Metodo para cargar los datos para mostrarlo en el vista
  cargarProducto(): void {
    this.activateRouter.params.subscribe((params) => {
      let id = params['id'];
      if (id) {
        this.productService
          .getProduct(id)
          .subscribe((producto) => (this.producto = producto));
      }
    });
  }

  //Metodo para actualizar el producto que mandamos por la vista
  updateProducto(): void {
    this.productService.updateProduct(this.producto).subscribe((producto) => {
      this.router.navigate(['/productos']);
      swal.fire('Producto Actualizado', 'Producto con exito', 'success');
    });
  }
}
