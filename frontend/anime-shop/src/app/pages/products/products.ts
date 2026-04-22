import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductListComponent } from '../../components/product-list-component/product-list-component';
import { Product } from '../../models/product.model';
import { Category } from '../../models/category.model';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductListComponent],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  fandoms: string[] = [];

  selectedCategoryId: number | null = null;
  selectedFandom = '';
  selectedState = 'all';

  newProduct: any = {
    name: '',
    price: 0,
    description: '',
    image: 'https://i.pinimg.com/1200x/af/fb/88/affb88d66beb1762e43d6adde37f6560.jpg',
    fandom: '',
    categoryId: null,
    images: [],
    link: 'https://ozon.ru',
    rating: 0
  };

  errorMessage = '';
  showToast = false;
  toastMessage = '';
  toastType: 'error' | 'success' = 'error';

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();

    this.route.queryParams.subscribe(params => {
      if (params['fandom']) {
        this.selectedFandom = params['fandom'];
      }
    });
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        if (data.length > 0 && !this.newProduct.categoryId) {
          this.newProduct.categoryId = data[0].id;
        }
      },
      error: () => {
        this.errorMessage = 'Error loading categories';
        this.showToastMessage('Error loading categories', 'error');
      }
    });
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.fandoms = [...new Set(data.map(p => p.fandom).filter(f => !!f))];
      },
      error: () => {
        this.errorMessage = 'Error loading products';
        this.showToastMessage('Error loading products', 'error');
      }
    });
  }

  filteredProducts(): Product[] {
    return this.products.filter(product => {
      const categoryMatch =
        this.selectedCategoryId === null || product.categoryId === this.selectedCategoryId;

      const fandomMatch =
        this.selectedFandom === '' || product.fandom === this.selectedFandom;

      const stateMatch =
        this.selectedState === 'all' ||
        (this.selectedState === 'liked' && product.isLiked) ||
        (this.selectedState === 'favorite' && product.isFavorite);

      return categoryMatch && fandomMatch && stateMatch;
    });
  }

  showToastMessage(message: string, type: 'error' | 'success' = 'error'): void {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;

    setTimeout(() => {
      this.showToast = false;
    }, 2000);
  }

  handleLike(id: number): void {
    const oldProducts = [...this.products];

    this.products = this.products.map(product =>
      product.id === id
        ? {
            ...product,
            isLiked: !product.isLiked,
            likes: product.isLiked
              ? Math.max((product.likes || 0) - 1, 0)
              : (product.likes || 0) + 1
          }
        : product
    );

    this.productService.toggleLike(id).subscribe({
      next: () => {
        this.errorMessage = '';
        // this.showToastMessage('Liked!', 'success');
      },
      error: () => {
        this.products = oldProducts;
        this.showToastMessage('Please login first to like products', 'error');
      }
    });
  }

  handleFavorite(id: number): void {
    const oldProducts = [...this.products];

    this.products = this.products.map(product =>
      product.id === id
        ? {
            ...product,
            isFavorite: !product.isFavorite
          }
        : product
    );

    this.productService.toggleFavorite(id).subscribe({
      next: () => {
        this.errorMessage = '';
        // this.showToastMessage('Favorites updated', 'success');
      },
      error: () => {
        this.products = oldProducts;
        this.showToastMessage('Please login first to add favorites', 'error');
      }
    });
  }

  handleDelete(id: number): void {
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.loadProducts();
        this.showToastMessage('Product deleted successfully', 'success');
      },
      error: () => {
        this.showToastMessage('You cannot delete this product', 'error');
      }
    });
  }

  addProduct(): void {
    const productToSend = {
      ...this.newProduct,
      image: this.newProduct.image?.trim()
        ? this.newProduct.image
        : 'https://i.pinimg.com/1200x/af/fb/88/affb88d66beb1762e43d6adde37f6560.jpg'
    };

    this.productService.addProduct(productToSend).subscribe({
      next: () => {
        this.loadProducts();
        this.newProduct = {
          name: '',
          price: 0,
          description: '',
          image: 'https://i.pinimg.com/1200x/af/fb/88/affb88d66beb1762e43d6adde37f6560.jpg',
          fandom: '',
          categoryId: this.categories.length ? this.categories[0].id : null,
          images: [],
          link: 'https://ozon.ru',
          rating: 0
        };
        this.errorMessage = '';
        this.showToastMessage('Product added successfully', 'success');
      },
      error: () => {
        this.showToastMessage('Product was not added', 'error');
      }
    });
  }
}