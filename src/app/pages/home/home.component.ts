import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart/cart.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  producto: Product[];

  constructor(
    private productService: ProductService,
    private router: Router,
    private activateRouter: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    // this.productService
    //   .getProducts()
    //   .subscribe((producto) => (this.producto = this.producto));

    this.listar();
  }

  addCart(producto: Product) {
    return this.cartService.addProductCart(producto);
  }

  private listar() {
    this.productService.getProducts().subscribe((dato) => {
      this.producto = dato;
    });
  }
}
