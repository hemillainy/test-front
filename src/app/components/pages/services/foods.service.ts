import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Food } from 'src/app/models/food';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FoodsService {

  cart: Food[] = [];
  addToCartEvent: EventEmitter<Food[]> = new EventEmitter();
  selectOptionEvent: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient, private router: Router) {
    const cartLocal = localStorage.getItem('cart');
    if (cartLocal === null) {
      localStorage.setItem('cart', JSON.stringify(this.cart));
    } else {
      this.cart = JSON.parse(localStorage.getItem('cart'));
    }
  }

  getFoods(): Observable<Food[]> {
    return this.http.get<Food[]>(environment.BASE_URL);
  }

  async getFoodsByName(name: string) {
    const foods = await this.http.get<Food[]>(`${environment.BASE_URL}/name/${name}`).toPromise();
    return foods;
  }

  async getFoodsByCuisine(cuisine: string) {
    const foods = await this.http.get<Food[]>(`${environment.BASE_URL}?cuisine=${cuisine}`).toPromise();
    return foods;
  }

  search(query: string): Observable<Food[]> {
    return this.http.get<Food[]>(`${environment.BASE_URL}/name/${query}`);
  }

  getRouter(): Router {
    return this.router;
  }

  addToCart(food: Food) {
    const indexFood = this.cart.findIndex(f => f.id === food.id);
    if (indexFood === -1) {
      const newFood = {
        ...food,
        quantity: 1
      };
      this.cart.push(newFood);
    } else {
      this.cart[indexFood].quantity += 1;
    }

    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.addToCartEvent.emit(this.cart);
  }

  getCart(): Food[] {
    return this.cart;
  }

  getTotalPrice(): number {
    const prices = this.cart.map(food => food.price);
    const quantities = this.cart.map(food => food.quantity);

    const individualPrice = prices.map((price, index) => {
      return price * quantities[index];
    });

    const priceTotal = individualPrice.reduce((price1, price2) => price1 + price2);
    return priceTotal;
  }

  setQuantity(food: Food, op: string): void {
    const indexFood = this.cart.findIndex(f => f.id === food.id);
    if (op === '+') {
      this.cart[indexFood].quantity += 1;
    } else {
      const id = this.cart[indexFood].id;
      const qtd = this.cart[indexFood].quantity - 1;
      if (qtd === 0) {
        this.cart = this.cart.filter(f => f.id !== id);
      } else {
        this.cart[indexFood].quantity -= 1;
      }
    }

    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
}
