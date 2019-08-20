import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { FoodsService } from '../../pages/services/foods.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

  private subscription: Subscription;
  private mode: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private foodService: FoodsService
  ) { }

  ngOnInit() {
  }

  async changeListing(param: string) {
    const foods = this.foodService.getFoodsByCuisine(param);
    this.foodService.selectOptionEvent.emit(foods);
    this.foodService.getRouter().navigate([], {
      queryParams: {
        typeFood: param
      }
    });
  }

}
