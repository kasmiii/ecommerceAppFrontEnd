import { Component, OnInit } from '@angular/core';
import { SalesPerson } from './sales-person';

@Component({
  selector: 'app-sales-person-list',
  templateUrl: './sales-person-list.component.html',
  styleUrls: ['./sales-person-list.component.scss']
})
export class SalesPersonListComponent implements OnInit {

  salesPersonList: SalesPerson[] = [
    new SalesPerson("mohammed","kasmi","mkasmi1997@gmail.com",4000),
    new SalesPerson("ikram","kasmi","mkasmi1997@gmail.com",20050),
    new SalesPerson("wassim","kasmi","mkasmi1997@gmail.com",30000),
    new SalesPerson("marwa","kasmi","mkasmi1997@gmail.com",78000)
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
