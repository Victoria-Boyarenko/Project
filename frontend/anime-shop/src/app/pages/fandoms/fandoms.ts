import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-fandoms',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fandoms.html',
  styleUrl: './fandoms.css'
})
export class FandomsComponent implements OnInit {
  fandoms: { name: string; image: string; count: number; bestLikes: number }[] = [];
  errorMessage = '';

  constructor(
    private productService: ProductService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadFandoms();
  }

  loadFandoms(): void {
    this.productService.getProducts().subscribe({
      next: (data: Product[]) => {
        const map: Record<string, { name: string; image: string; count: number; bestLikes: number }> = {};

        data.forEach((p: Product) => {
          const fandom = (p.fandom || '').trim();
          if (!fandom) return;

          if (!map[fandom]) {
            map[fandom] = {
              name: fandom,
              image: p.image,
              count: 0,
              bestLikes: p.likes || 0
            };
          } else {
            if ((p.likes || 0) > map[fandom].bestLikes) {
              map[fandom].image = p.image;
              map[fandom].bestLikes = p.likes || 0;
            }
          }

          map[fandom].count += 1;
        });

        this.fandoms = Object.values(map);
        this.errorMessage = '';
        console.log('FANDOMS:', this.fandoms);
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.log('FANDOMS ERROR:', err);
        this.errorMessage = 'Error loading fandoms';
        this.fandoms = [];
        this.cdr.detectChanges();
      }
    });
  }

  openFandom(fandom: string): void {
    this.router.navigate(['/products'], {
      queryParams: { fandom }
    });
  }
}

 