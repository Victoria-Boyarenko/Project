import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductListComponent } from '../../components/product-list-component/product-list-component';
import { Product } from '../../models/product.model';
import { Category } from '../../models/category.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductListComponent],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  categories: Category[] = [
    { id: 1, name: 'Figures' },
    { id: 2, name: 'Manga' },
    { id: 3, name: 'Clothing' }
  ];

  selectedCategoryId: number | null = null;

  newProduct: any = {
    name: '',
    price: 0,
    description: '',
    image: 'https://i.pinimg.com/1200x/af/fb/88/affb88d66beb1762e43d6adde37f6560.jpg',
    categoryId: 1
  };

  errorMessage = '';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const categoryId = Number(params['category']);
      this.selectedCategoryId = categoryId || null;
    });

    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => this.products = data,
      error: () => this.errorMessage = 'Error loading products'
    });
  }

  selectCategory(id: number): void {
    this.selectedCategoryId = id;
  }

  filteredProducts(): Product[] {
    if (this.selectedCategoryId === null) {
      return [];
    }
    return this.products.filter(p => p.categoryId === this.selectedCategoryId);
  }

  handleLike(id: number): void {
    this.productService.likeProduct(id).subscribe(() => this.loadProducts());
  }

  handleDelete(id: number): void {
    this.productService.deleteProduct(id).subscribe(() => this.loadProducts());
  }

  addProduct(): void {
    const defaultImage = 'https://i.pinimg.com/1200x/af/fb/88/affb88d66beb1762e43d6adde37f6560.jpg';

    const productToSend = {
      ...this.newProduct,
      image: this.newProduct.image && this.newProduct.image.trim() !== ''
        ? this.newProduct.image
        : defaultImage
    };

    this.productService.addProduct(productToSend).subscribe({
      next: () => {
        this.loadProducts();
        this.newProduct = {
          name: '',
          price: 0,
          description: '',
          image: defaultImage,
          categoryId: 1
        };
        this.errorMessage = '';
      },
      error: (err) => {
        console.log('ADD ERROR:', err);
        this.errorMessage = 'Product was not added';
      }
    });
  }
}



// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { ActivatedRoute } from '@angular/router';
// import { ProductListComponent } from '../../components/product-list-component/product-list-component';
// import { Product } from '../../models/product.model';
// import { Category } from '../../models/category.model';
// import { ProductService } from '../../services/product.service';

// @Component({
//   selector: 'app-products',
//   standalone: true,
//   imports: [CommonModule, FormsModule, ProductListComponent],
//   templateUrl: './products.html',
//   styleUrl: './products.css'
// })
// export class ProductsComponent implements OnInit {
//   products: Product[] = [];

//   categories: Category[] = [
//     { id: 1, name: 'Figures' },
//     { id: 2, name: 'Manga' },
//     { id: 3, name: 'Clothing' }
//   ];

//   selectedCategoryId: number | null = null;

//   newProduct: any = {
//     name: '',
//     price: 0,
//     description: '',
//     image: '',
//     categoryId: 1
//   };

//   errorMessage = '';

//   constructor(
//     private productService: ProductService,
//     private route: ActivatedRoute
//   ) {}

//   ngOnInit(): void {
//     this.route.queryParams.subscribe(params => {
//       const categoryId = Number(params['category']);
//       this.selectedCategoryId = categoryId || null;
//     });

//     this.loadProducts();
//   }

//   loadProducts(): void {
//     this.productService.getProducts().subscribe({
//       next: (data) => this.products = data,
//       error: () => this.errorMessage = 'Error loading products'
//     });
//   }

//   selectCategory(id: number): void {
//     this.selectedCategoryId = id;
//   }

//   filteredProducts(): Product[] {
//     if (this.selectedCategoryId === null) {
//       return [];
//     }
//     return this.products.filter(p => p.categoryId === this.selectedCategoryId);
//   }

//   handleLike(id: number): void {
//     this.productService.likeProduct(id).subscribe(() => this.loadProducts());
//   }

//   handleDelete(id: number): void {
//     this.productService.deleteProduct(id).subscribe(() => this.loadProducts());
//   }

//   addProduct(): void {
//     this.productService.addProduct(this.newProduct).subscribe(() => {
//       this.loadProducts();
//       this.newProduct = {
//         name: '',
//         price: 0,
//         description: '',
//         image: '',
//         categoryId: 1
//       };
//     });
//   }
// }


 