import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { ProductsComponent } from './pages/products/products';
import { CategoriesComponent } from './pages/categories/categories';
import { LoginComponent } from './pages/login/login';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'login', component: LoginComponent }
];