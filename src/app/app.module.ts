import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductComponent } from './pages/product/product.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CartComponent } from './pages/cart/cart.component';
import { ProductAddComponent } from './pages/product-add/product-add.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { ProductUpdateComponent } from './pages/product-update/product-update.component';
import { FormComponent } from './pages/product/form.component';
import { DetalleComponent } from './pages/product/detalle/detalle.component';
import { AdminComponent } from './pages/admin/admin/admin.component';
import { interceptorProvider } from './services/interceptors/product-interceptor.service';
import { FacturaComponent } from './pages/factura/factura/factura.component';
import { CategoriaComponent } from './pages/categoria/categoria/categoria.component';
import { FormularioCateogiraComponent } from './pages/categoria/formulario-cateogira/formulario-cateogira.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    FooterComponent,
    ProductComponent,
    CartComponent,
    ProductAddComponent,
    ProductUpdateComponent,
    FormComponent,
    DetalleComponent,
    AdminComponent,
    FacturaComponent,
    CategoriaComponent,
    FormularioCateogiraComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatSnackBarModule,
    MatCardModule,
    MatListModule,
    MatMenuModule,
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
