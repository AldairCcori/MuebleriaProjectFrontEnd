import { Categoria } from './categoria';

export class Product {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  imagen: string;
  cantidad: number;
  categoriaProducto: Categoria;
}
