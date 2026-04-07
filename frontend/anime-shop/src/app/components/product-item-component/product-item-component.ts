import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { input, output } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-item-component',
  imports: [CommonModule],
  templateUrl: './product-item-component.html',
  styleUrl: './product-item-component.css',
})
export class ProductItemComponent {
  product = input.required<Product>();
  like = output<number>();
  delete = output<number>();

  onLikeClick (): void {
    this.like.emit (this.product().id);
  }

  onDeleteClick(): void{
    this.delete.emit (this.product().id);
  }

  
  shareOnWhatsaApp (link: string){
    const message = 'Check out this product: ' + link;

    const encodeMessage = encodeURIComponent(message);

    const url  = 'https://wa.me/?text='+ encodeMessage;
    
    window.open(url, '_blank');
  }

  shareOnTelegram(link: string, name: string){
    const encodedUrl = encodeURIComponent(link);

    const encodeText = encodeURIComponent(name);

    const url = `https://t.me/share/url?url=${encodedUrl}&text=${encodeText}`;

    window.open (url, '_blank')
  }

  
  getAllImages (p: Product): string[] {
    return [p.image, ...p.images];
  }

  selectedImageIndex: Record<number, number> = {};

  getIndex(productId: number): number {
    return this.selectedImageIndex[productId] ?? 0;
  }

  setIndex(productId: number, index: number): void {
    this.selectedImageIndex[productId] = index;
  }

  prevImage(productId: number, total: number): void {
    const current = this.getIndex(productId);
    const next = (current - 1 + total)%total;
    this.setIndex(productId, next);
  }

  nextImage (productId: number, total: number): void{
    const current = this.getIndex(productId);
    const next = (current + 1)% total;
    this.setIndex(productId,next); 
  }

}
