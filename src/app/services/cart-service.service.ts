import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  cardItems: CartItem[] = [];

  //subject is a subclass of an observable used to pulish events to all subscribers...
  /**l'utilisation de ces subjects(observables) permet d'envoyer les valeurs totalPrice et quantity au subscribers de maniere asynchrone et continue qui permet de changer les valeurs dans le component card-status de maniere continue a chaque ajout de ligne de commande */
  totalPrice: Subject<number>=new Subject<number>();
  totalQuantity: Subject<number>=new Subject<number>();
  
  constructor() { }

  addToCart(cardItem:CartItem) {
    
    let alreadyExistsInCard = false;
    let existingCardItem = undefined;

    if (this.cardItems.length > 0) {

      for (let tempCard of this.cardItems) {
        //const element = array[index];
        if (tempCard.id === cardItem.id) {
          existingCardItem = tempCard;
          break
        }
      }
    }

      alreadyExistsInCard = (existingCardItem !== undefined);
      
      if (alreadyExistsInCard) {
        existingCardItem.quantity++;  
      }

      else this.cardItems.push(cardItem);   
      
      
      this.computeCardTotals();
    }
  
    computeCardTotals() {
      //throw new Error('Method not implemented.');
      let totalPriceValue: number = 0;
      let totalQuantityValue: number = 0;
      
      for (let tempCard of this.cardItems){
        totalPriceValue += tempCard.quantity * tempCard.unitPrice;
        totalQuantityValue += tempCard.quantity;
      }
      
      // publish the new values ... all subscribers will receive the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    // log cart data just for debugging purposes
    this.logCartData(totalPriceValue,totalQuantityValue);
    }
  
  logCartData(totalPriceValue: any, totalQuantityValue: any) {
    
    console.log('Contents of the cart');
    for (let tempCartItem of this.cardItems) {
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(`name: ${tempCartItem.name}, quantity=${tempCartItem.quantity}, unitPrice=${tempCartItem.unitPrice}, subTotalPrice=${subTotalPrice}`);
    }

    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`);
    console.log('----');

  }
    
  }

  