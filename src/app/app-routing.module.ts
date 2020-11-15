import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';
import { SignComponent } from './sign/sign.component';


const routes: Routes = [
  {path:'search/:keyword',component:ProductListComponent},
  {path:'category/:id/:categoryName',component:ProductListComponent},
  {path:'category',component:ProductListComponent},
  {path: 'products', component: ProductListComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'signin' , component : SignComponent },
  { path: 'signup' , component : SignComponent },
  { path:'', redirectTo:'/products',pathMatch:'full'},
  { path:'**', redirectTo:'/products',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
