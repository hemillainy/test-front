import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FoodsService } from '../../pages/services/foods.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  private subscription: Subscription;
  private queryParam: string;

  constructor(
    private foodService: FoodsService,
    private route: ActivatedRoute,
    ) { }

  searchForm: FormGroup = new FormGroup({
    query: new FormControl('')
  });

  ngOnInit() {
  }

  search(): void {
    const query = this.searchForm.get('query').value;
    const foods = this.foodService.getFoodsByName(query);

    this.subscription = this.route.queryParams.subscribe(
      queryParams => this.queryParam = queryParams.search
    );

    this.foodService.selectOptionEvent.emit(foods);

    this.foodService.getRouter().navigate([], {
      queryParams: {
        search: query
      }
    });
  }
}
