import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './categories.html',
  styleUrl: './categories.css'
})
export class CategoriesComponent {
  categories: Category[] = [
    { id: 1, name: 'Figures' },
    { id: 2, name: 'Manga' },
    { id: 3, name: 'Clothing' }
  ];
}