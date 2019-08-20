import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Food } from 'src/app/models/food';
import { FoodsService } from '../services/foods.service';
import { Observable, Subscription } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  animations: [
    trigger('toggle', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('250ms 250ms', style({ opacity: 1  })),
      ]),
      transition(':leave', [
        animate('250ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {


  constructor() { }

  ngOnInit() {
  }
}
