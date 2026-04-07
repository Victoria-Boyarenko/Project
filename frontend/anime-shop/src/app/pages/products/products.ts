import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductListComponent } from '../../components/product-list-component/product-list-component';
import { Product } from '../../models/product.model';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductListComponent],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [
   {
        id: 1,
        name: "Книга Достоевский Ф.М Преступление и наказание",
        description: "Преступление и наказание - высочайший образец криминального романа. В рамках жанра полицейского расследования писатель поставил вопросы, и по сей день не решенные. Кем должен быть человек: тварью дрожащей, как говорит Раскольников, или Наполеоном?",
        price: 1999,
        rating: 5.0,
        image: "https://resources.cdn-kaspi.kz/img/m/p/pa3/p81/36473955.png?format=gallery-medium",
        images: [
            'https://resources.cdn-kaspi.kz/img/m/p/pdc/p81/36473957.jpg?format=gallery-medium',
            'https://resources.cdn-kaspi.kz/img/m/p/pf8/p81/36473958.jpg?format=gallery-medium',
            'https://resources.cdn-kaspi.kz/img/m/p/p14/p82/36473959.jpg?format=gallery-medium'
        ],
        link: "https://kaspi.kz/shop/p/dostoevskii-f-m-prestuplenie-i-nakazanie-101176963/?c=750000000&utm_source=google&utm_medium=cpc&utm_campaign=shop_google_search_sports_and_outdoors_sports_nutrition_brand&gclid=CjwKCAiAzOXMBhASEiwAe14Saf3hmd0SC1trcmyTjPXhKR8T0NhwJqQKy7rEUykjS1CL8pmXiFFHXBoCA7gQAvD_BwE",
        likes: 0,
        categoryId: 1
    },
    {
        id: 2,
        name: "Книга Гоголь Н. В.: Мертвые души",
        description: "Гоголь много времени проводил за границей, там он написал свою поэму Мертвые души, там же, переезжая из страны в страну, написал и второй том Мертвых душ.",
        price: 1830,
        rating: 4.9,
        image: "https://resources.cdn-kaspi.kz/img/m/p/pa0/p5c/38131676.jpg?format=gallery-medium",
        images: [
            'https://resources.cdn-kaspi.kz/img/m/p/pc3/p59/38131681.jpg?format=gallery-medium',
            'https://resources.cdn-kaspi.kz/img/m/p/p52/p59/38131685.jpg?format=gallery-medium',
            'https://resources.cdn-kaspi.kz/img/m/p/p75/p56/38131690.jpg?format=gallery-medium'
        ],
        link: "https://kaspi.kz/shop/p/gogol-n-v-mertvye-dushi-100299059/?c=750000000&utm_source=google&utm_medium=cpc&utm_campaign=shop_google_search_sports_and_outdoors_sports_nutrition_brand&gclid=CjwKCAiAzOXMBhASEiwAe14Saf3hmd0SC1trcmyTjPXhKR8T0NhwJqQKy7rEUykjS1CL8pmXiFFHXBoCA7gQAvD_BwE",
        likes: 0,
        categoryId: 3
    },    
    {
        id: 3,
        name: "Книга Пушкин А.С.: Евгений Онегин ",
        description: "Евгений Онегин (1823-1831) - одно из самых значительных произведений русской литературы. Пронзительная любовная история, драматические повороты сюжета, тонкий психологизм персонажей, детальное описание быта и нравов той эпохи.",
        price: 1829,
        rating: 4.6,
        image: "https://resources.cdn-kaspi.kz/img/m/p/p10/pc4/36711399.jpg?format=gallery-medium",
        images: [
            'https://resources.cdn-kaspi.kz/img/m/p/pf9/p79/36711400.jpg?format=gallery-medium',
            'https://resources.cdn-kaspi.kz/img/m/p/pdd/p79/36711401.jpg?format=gallery-medium',
            'https://resources.cdn-kaspi.kz/img/m/p/pc0/p79/36711402.jpg?format=gallery-medium'
        ],
        link: "https://kaspi.kz/shop/p/pushkin-a-s-evgenii-onegin-boris-godunov-malen-kie-tragedii--101676351/?c=750000000&utm_source=google&utm_medium=cpc&utm_campaign=shop_google_search_sports_and_outdoors_sports_nutrition_brand&gclid=CjwKCAiAzOXMBhASEiwAe14Saf3hmd0SC1trcmyTjPXhKR8T0NhwJqQKy7rEUykjS1CL8pmXiFFHXBoCA7gQAvD_BwE",
        likes: 0,
        categoryId: 1
    },    
    {
        id: 4,
        name: "Книга Кинг С.: Бегущий человек",
        description: "Год 2025-й. Здесь царит нищета и безнадежность. Здесь люди участвуют не в президентских гонках, а в гонках со Смертью.",
        price: 2337,
        rating: 4.9,
        image: "https://resources.cdn-kaspi.kz/img/m/p/hf0/h88/84927124176926.png?format=gallery-medium",
        images: [
            'https://resources.cdn-kaspi.kz/img/m/p/hf0/h88/84927124176926.png?format=gallery-medium',
            'https://resources.cdn-kaspi.kz/img/m/p/h36/ha3/84927124242462.png?format=gallery-medium',
            'https://resources.cdn-kaspi.kz/img/m/p/h56/h14/84927124307998.png?format=gallery-medium'
        ],
        link: "https://kaspi.kz/shop/p/king-s-beguschii-chelovek-115926526/?c=750000000&utm_source=google&utm_medium=cpc&utm_campaign=shop_google_search_sports_and_outdoors_sports_nutrition_brand&gclid=CjwKCAiAzOXMBhASEiwAe14SaXVC28McjFIWG1EQrSXM_riFYjsMKdvgPPi7Q0VKYS22uuv5O1qv2BoCd60QAvD_BwE",
        likes: 0,
        categoryId: 3
    },
        {
        id: 5,
        name: "Книга Стивенсон Р.Л.: Клуб самоубийц",
        description: " Добро пожаловать в мир удивительных приключений и хитро задуманных преступлений, головокружительных погонь, смертельных дуэлей и умопомрачительно смешных диалогов, - мир, в котором викторианский рыцарь без страха и упрека принц Флоризель и его верный друг полковник Джеральдин ведут смертельную схватку со Злом, защищая несправедливо обиженных, - и ни на минуту не теряют при этом достойного истинных джентльменов чувства юмора.",
        price: 1855,
        rating: 4.8,
        image: "https://resources.cdn-kaspi.kz/img/m/p/p97/p35/36100480.jpg?format=gallery-medium",
        images: [
            'https://resources.cdn-kaspi.kz/img/m/p/pb3/p35/36100481.jpg?format=gallery-medium',
            'https://resources.cdn-kaspi.kz/img/m/p/pd0/p35/36100482.jpg?format=gallery-medium',
            'https://resources.cdn-kaspi.kz/img/m/p/pec/p35/36100483.jpg?format=gallery-medium'
        ],
        link: "https://kaspi.kz/shop/p/stivenson-r-l-klub-samoubiits-100624933/?c=750000000&m=4845032&isPromoted=true&campaign_id=2565789&ads_unique_id=2f70bc95-d35d-4b4d-98a8-252917f9d61f&ref=shared_link",
        likes: 0,
        categoryId: 1
    },
    {
        id: 6,
        name: "Повседневный костюм EA7 черный",
        description: "Женский универсальный спортивный костюм из эластичной модальной ткани включает толстовку на молнии и брюки свободного кроя. Модель украшена контрастным логотипом бренда и фирменной лентой на рукавах толстовки и по бокам брюк. ",
        price: 180000,
        rating: 4.0,
        image: "https://resources.cdn-kaspi.kz/img/m/p/p0c/p90/106984515.jpg?format=gallery-medium",
        images: [
            'https://resources.cdn-kaspi.kz/img/m/p/pb8/p8f/106984518.jpg?format=gallery-medium',
            'https://resources.cdn-kaspi.kz/img/m/p/p6f/p7d/103295011.jpg?format=gallery-medium',
            'https://resources.cdn-kaspi.kz/img/m/p/p49/p81/103295025.jpg?format=gallery-medium'
        ],
        link: "https://kaspi.kz/shop/p/povsednevnyi-kostjum-ea7-7w000979af12501-chernyi-m-156497966/?c=750000000&m=7life&sr=2&isPromoted=true&campaign_id=2469476&ads_unique_id=69f3683e-12a8-4796-8e16-7b18e44a71e9&hasVariants=true&ref=shared_link",
        likes: 0,
        categoryId: 2
    }
  ];

  categories: Category[] = [
    { id: 1, name: 'Figures' },
    { id: 2, name: 'Manga' },
    { id: 3, name: 'Clothing' }
  ];

  selectedCategoryId: number | null = 1;

  newProduct = {
    name: '',
    price: 0,
    description: '',
    image: '',
    categoryId: 1
  };

  errorMessage = '';

  ngOnInit(): void {}

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
    const item = this.products.find(p => p.id === id);
    if (item) {
      item.likes++;
    }
  }

  handleDelete(id: number): void {
    this.products = this.products.filter(p => p.id !== id);
  }

  addProduct(): void {
    const newId =
      this.products.length > 0
        ? Math.max(...this.products.map(p => p.id)) + 1
        : 1;

    const product: Product = {
      id: newId,
      name: this.newProduct.name,
      description: this.newProduct.description,
      price: this.newProduct.price,
      rating: 0,
      image: this.newProduct.image || 'https://i.pinimg.com/736x/af/fb/88/affb88d66beb1762e43d6adde37f6560.jpg',
      images: [
        this.newProduct.image || 'https://i.pinimg.com/736x/af/fb/88/affb88d66beb1762e43d6adde37f6560.jpg'
      ],
      link: 'https://kaspi.kz',
      likes: 0,
      categoryId: Number(this.newProduct.categoryId)
    };

    this.products.push(product);

    this.newProduct = {
      name: '',
      price: 0,
      description: '',
      image: '',
      categoryId: 1
    };
  }
}




/* 
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
    image: '',
    categoryId: 1
  };

  errorMessage = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
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
    this.productService.addProduct(this.newProduct).subscribe(() => {
      this.loadProducts();
      this.newProduct = {
        name: '',
        price: 0,
        description: '',
        image: '',
        categoryId: 1
      };
    });
  }
}
  */