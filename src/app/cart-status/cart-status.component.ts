import { Component, OnInit } from '@angular/core';
import { CartServiceService } from '../services/cart-service.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.scss']
})
export class CartStatusComponent implements OnInit {

  totalPrice:number=0.00;
  quantity: number = 0;

  constructor(private cartService:CartServiceService) { }

  ngOnInit(): void {
    this.updateStatus();
  }

  updateStatus() {
    //throw new Error('Method not implemented.');
    this.cartService.totalPrice.subscribe(
      (data) => {
        this.totalPrice = data;
      }
    );

    this.cartService.totalQuantity.subscribe(
      data=> this.quantity = data
    );
  }

}
