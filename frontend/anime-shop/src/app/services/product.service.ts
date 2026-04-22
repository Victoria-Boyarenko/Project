import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private api = 'http://127.0.0.1:8000/api/products/';
  private favoritesApi = 'http://127.0.0.1:8000/api/favorites/';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.api);
  }

  addProduct(product: any) {
    return this.http.post(this.api, product);
  }

  deleteProduct(id: number) {
    return this.http.delete(this.api + id + '/');
  }

  updateProduct(id: number, data: any) {
    return this.http.patch(this.api + id + '/', data);
  }

  toggleLike(id: number) {
    return this.http.post<{ isLiked: boolean; likes: number }>(
      this.api + id + '/like/',
      {}
    );
  }

  toggleFavorite(id: number) {
    return this.http.post<{ isFavorite: boolean }>(
      this.api + id + '/favorite/',
      {}
    );
  }

  getFavorites() {
    return this.http.get(this.favoritesApi);
  }
}