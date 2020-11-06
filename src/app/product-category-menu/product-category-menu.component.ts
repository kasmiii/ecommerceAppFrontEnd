import { Component, OnInit } from '@angular/core';
import { ProductCategory } from '../common/product-category';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.scss']
})
export class ProductCategoryMenuComponent implements OnInit {

  constructor(private productService:ProductService) { }

  productCategories: ProductCategory[];

  ngOnInit(): void {
    this.listProductsCategories();
  }

  listProductsCategories() {
    this.productService.getListCategories().subscribe(
      (data) => {
        this.productCategories = data;
        console.log("list of categories receipted is::",JSON.stringify(data));
        
      }
    

    );
    //throw new Error('Method not implemented.');
  }

}
