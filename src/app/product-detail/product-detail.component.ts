import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../common/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  constructor(private productService:ProductService,private route:ActivatedRoute) { }
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

}
