import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { Food } from 'src/app/models/food';
import { FoodsService } from '../services/foods.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.sass'],
  animations: [
    trigger('toggle', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('250ms 250ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('250ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class ListingComponent implements OnInit, OnDestroy {

  private filteringOption: string;
  private queryParam: string;
  private subscription: Subscription;

  public foods: any;

  constructor(
    private foodService: FoodsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.foods = this.foodService.getFoods();

    this.foodService.selectOptionEvent.subscribe(
      params => {
        if (typeof (params) === 'string') {
          this.foods = this.foodService.getFoodsByCuisine(params);
        } else {
          this.foods = params;
        }
      }
    );

    this.checkQuery();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  addToCart(food: Food) {
    this.foodService.addToCart(food);
  }

  checkQuery() {
    this.subscription = this.route.queryParams.subscribe(
      queryParams => {
        if (queryParams.search) {
          this.queryParam = queryParams.search;
          this.foods = this.foodService.getFoodsByName(queryParams.search);

        } else {
          if (queryParams.typeFood !== undefined) {
            this.queryParam = queryParams.typeFood;
          } else if (!queryParams.typeFood && !queryParams.search) {
            this.queryParam = 'all';
          }

          this.foodService.selectOptionEvent.emit(this.queryParam);
        }
      });
  }
}
