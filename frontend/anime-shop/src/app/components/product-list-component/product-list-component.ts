import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { ProductItemComponent } from '../product-item-component/product-item-component';

@Component({
  selector: 'app-product-list-component',
  imports: [CommonModule, ProductItemComponent],
  templateUrl: './product-list-component.html',
  styleUrl: './product-list-component.css',
})
export class ProductListComponent {

  products = input.required<Product[]>();
  like = output<number>();
  delete = output<number>();

  onLike (id: number):void{
    this.like.emit(id);
  }

  onDelete (id: number): void {
    this.delete.emit(id);
  }

}
