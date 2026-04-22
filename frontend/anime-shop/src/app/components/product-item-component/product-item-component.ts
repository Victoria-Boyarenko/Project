import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-item-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-item-component.html',
  styleUrl: './product-item-component.css',
})
export class ProductItemComponent {
  product = input.required<Product>();
  like = output<number>();
  favorite = output<number>();
  delete = output<number>();

  selectedImageIndex: Record<number, number> = {};

  onLikeClick(): void {
    this.like.emit(this.product().id);
  }

  onFavoriteClick(): void {
    this.favorite.emit(this.product().id);
  }

  onDeleteClick(): void {
    this.delete.emit(this.product().id);
  }

  shareOnWhatsApp(link: string): void {
    const message = 'Check out this product: ' + link;
    const encodedMessage = encodeURIComponent(message);
    const url = 'https://wa.me/?text=' + encodedMessage;
    window.open(url, '_blank');
  }

  shareOnTelegram(link: string, name: string): void {
    const encodedUrl = encodeURIComponent(link);
    const encodedText = encodeURIComponent(name);
    const url = `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`;
    window.open(url, '_blank');
  }

  getAllImages(p: Product): string[] {
    return [p.image, ...(p.images || [])];
  }

  getIndex(productId: number): number {
    return this.selectedImageIndex[productId] ?? 0;
  }

  setIndex(productId: number, index: number): void {
    this.selectedImageIndex[productId] = index;
  }

  prevImage(productId: number, total: number): void {
    const current = this.getIndex(productId);
    const next = (current - 1 + total) % total;
    this.setIndex(productId, next);
  }

  nextImage(productId: number, total: number): void {
    const current = this.getIndex(productId);
    const next = (current + 1) % total;
    this.setIndex(productId, next);
  }
}