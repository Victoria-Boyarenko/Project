import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private api = 'http://127.0.0.1:8000/api/products/';

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<Product[]>(this.api);
  }

  addProduct(product: Product) {
    return this.http.post(this.api, product);
  }

  deleteProduct(id: number) {
    return this.http.delete(this.api + id + '/');
  }

  likeProduct(id: number) {
    return this.http.patch(this.api + id + '/', {});
  }
}