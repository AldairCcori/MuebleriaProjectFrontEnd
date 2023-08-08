import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/categoria';
import { Product } from 'src/app/models/product';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { TokenService } from 'src/app/services/user/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLogged = false;
  isLoggedUser = true;
  public categorias: Categoria[];
  public producto: Product = new Product();

  constructor(
    private tokenService: TokenService,
    public modalService: ModalService,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.isLogged = this.tokenService.isLogged();

    this.cargarCategorias();
  }

  onLogOut(): void {
    this.tokenService.logOut();
  }

  abrirModal() {
    this.modalService.abrirModal();
  }

  private cargarCategorias() {
    this.categoriaService.getCategorias().subscribe((dato) => {
      this.categorias = dato;
    });
  }
  compararCategoria(o1: Categoria, o2: Categoria) {
    if (o1 == undefined && o2 == undefined) {
      return true;
    }
    return o1 == null || o2 == null ? false : o1.id === o2.id;
  }
}
