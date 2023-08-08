import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductComponent } from './pages/product/product.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductAddComponent } from './pages/product-add/product-add.component';
import { ProductUpdateComponent } from './pages/product-update/product-update.component';
import { FormComponent } from './pages/product/form.component';
import { DetalleComponent } from './pages/product/detalle/detalle.component';
import { AdminComponent } from './pages/admin/admin/admin.component';
import { ProducGuardService as guard } from './guards/produc-guard.service';
import { LoginGuard } from './guards/login.guard';
import { FacturaComponent } from './pages/factura/factura/factura.component';
import { CategoriaComponent } from './pages/categoria/categoria/categoria.component';
import { FormularioCateogiraComponent } from './pages/categoria/formulario-cateogira/formulario-cateogira.component';

const routes: Routes = [
  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full',
    canActivate: [LoginGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
    canActivate: [LoginGuard],
  },
  {
    path: 'productos',
    component: ProductComponent,
    pathMatch: 'full',
    canActivate: [guard],
    data: { expectedRol: ['admin'] },
  },
  {
    path: 'categoria',
    component: CategoriaComponent,
    pathMatch: 'full',
    canActivate: [guard],
    data: { expectedRol: ['admin'] },
  },
  {
    path: 'cart',
    component: CartComponent,
    pathMatch: 'full',
    canActivate: [guard],
    data: { expectedRol: ['user'] },
  },
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'admin', component: AdminComponent, pathMatch: 'full' },
  { path: 'factura', component: FacturaComponent, pathMatch: 'full' },
  //{ path: '**', redirectTo: '', pathMatch: 'full' },
  {
    path: 'product/form',
    component: FormComponent,
    pathMatch: 'full',
    canActivate: [guard],
    data: { expectedRol: ['admin'] },
  },
  {
    path: 'product/form/:id',
    component: FormComponent,
    pathMatch: 'full',
    canActivate: [guard],
    data: { expectedRol: ['admin'] },
  },
  {
    path: 'product/detalle/:id',
    component: DetalleComponent,
    pathMatch: 'full',
    canActivate: [guard],
    data: { expectedRol: ['admin'] },
  },
  {
    path: 'categoria/form',
    component: FormularioCateogiraComponent,
    pathMatch: 'full',
    canActivate: [guard],
    data: { expectedRol: ['admin'] },
  },
  {
    path: 'categoria/form/:id',
    component: FormularioCateogiraComponent,
    pathMatch: 'full',
    canActivate: [guard],
    data: { expectedRol: ['admin'] },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
