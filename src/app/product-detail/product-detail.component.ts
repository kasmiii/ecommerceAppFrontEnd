import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from '../common/cart-item';
import { Product } from '../common/product';
import { CartServiceService } from '../services/cart-service.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
  
export class ProductDetailComponent implements OnInit {

  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private cartService:CartServiceService) { }
  id: number;
  product: Product=new Product();

  ngOnInit(): void {

    this.id = +this.route.snapshot.paramMap.get("id");
    //console.log("id::"+this.id);
    
    this.productService.getProductById(this.id).subscribe(
      (data) => {
        this.product = data;  
        //console.log("product detail::" + this.product.id);
      }
    );
  }

  addToCart(product){
    console.log("the temp Product is::"+product.name);
    this.cartService.addToCart(new CartItem(product));
    this.cartService.computeCardTotals();
    //this.cartService.logCartData();
  }

}
