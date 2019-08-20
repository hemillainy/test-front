import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Food } from 'src/app/models/food';
import { FoodsService } from '../services/foods.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass'],
  animations: [
    trigger('toggle', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('325ms 325ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('325ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class CartComponent implements OnInit {

  foods: Food[] = [];
  modalRef: BsModalRef;

  @ViewChild('template', { static: false })
  modal: TemplateRef<any>;

  constructor(
    private foodsService: FoodsService,
    private modalService: BsModalService
  ) { }


  ngOnInit() {
    this.foods = this.foodsService.getCart();

    this.foodsService.addToCartEvent.subscribe(
      cart => this.foods = cart
    );
  }

  totalPrice(): number {
    let totalPrice = 0;
    if (this.foods.length > 0) {

      const prices = this.foods.map(food => food.price);
      const quantities = this.foods.map(food => food.quantity);

      const individualPrice = prices.map((price, index) => {
        return price * quantities[index];
      });
      totalPrice = individualPrice.reduce((price1, price2) => price1 + price2);
    }

    return totalPrice;
  }

  setQuantity(food: Food, op: string) {
    this.foodsService.setQuantity(food, op);
    this.foodsService.addToCartEvent.emit(this.foodsService.getCart());
  }

  checkCart(): void {
    this.modalRef = this.modalService.show(this.modal);
  }
}
