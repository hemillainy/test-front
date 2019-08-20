import { Component, OnInit, Input } from '@angular/core';
import { Food } from 'src/app/models/food';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.sass']
})
export class FoodsComponent implements OnInit {

  // tslint:disable-next-line: no-input-rename
  // @Input('foodList') foods: Food[];

  constructor() { }

  ngOnInit() {
  }

}
