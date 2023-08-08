import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product/product.service';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'],
})
export class ProductAddComponent implements OnInit {
  public producto: Product = new Product();

  constructor(
    private productService: ProductService,
    private router: Router,
    private activateRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  cargarProducto(): void {
    this.activateRouter.params.subscribe((params) => {
      let id = params['id'];
      if (id) {
        this.productService
          .getProduct(id)
          .subscribe((producto) => this.producto);
      }
    });
  }

  public create(): void {
    this.productService.getSaveProduct(this.producto).subscribe((producto) => {
      this.router.navigate(['/productos']);
      swal.fire('nuevo cliente', 'Producto guarado con exito', 'success');
    });
  }
}
