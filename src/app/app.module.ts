import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductCard } from './components/product-card/product-card.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AdminComponent } from './components/admin/admin.component';

import { Routes, RouterModule } from '@angular/router';
import { ProductsCards } from './components/products-cards/products-cards.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProductsTableComponent } from './components/products-table/products-table.component';
import { BtnGotopComponent } from './components/btn-gotop/btn-gotop.component';
import { ToastComponent } from './components/toast/toast.component';

const routes: Routes = [
  { path: '', component: HomeComponent} , 
  { path: 'admin', component: AdminComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ProductCard,
    CreateProductComponent,
    NavbarComponent,
    AdminComponent,
    ProductsCards,
    HomeComponent,
    NotFoundComponent, ProductsTableComponent, BtnGotopComponent, ToastComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
