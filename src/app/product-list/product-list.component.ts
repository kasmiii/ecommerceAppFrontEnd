import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { interval } from 'rxjs/internal/observable/interval';
import { of } from 'rxjs/internal/observable/of';
import { map } from 'rxjs/internal/operators/map';
import { switchMap } from 'rxjs/operators';
import { CartItem } from '../common/cart-item';
import { Product } from '../common/product';
import { CartServiceService } from '../services/cart-service.service';
import { getResponse, ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  thePageNumber: any;
  thepageSize: number=5;
  theTotalElements: any;
  previousCategoryId: number=1;

  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private cartService:CartServiceService) { }

  products: Product[];
  currentCategoryId:number=1;
  currentCategoryName: string;
  products$: Observable<Product[]>;
  searchMode: boolean;
  productsPaginate$:Observable<getResponse>;

  ngOnInit(): void {
  
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchProducts();
    }
    else this.handleListProducts();
}

handleListProducts() {

    this.productsPaginate$=this.route.paramMap.pipe(
      
      switchMap(params => {
        const hasCategory = params.has('id');
        if (hasCategory) {
          this.currentCategoryId = +params.get('id');//+ for converting the string into a number bcz get function return always a string  
          this.currentCategoryName = params.get('categoryName');
        }
        
        else {
          this.currentCategoryId = 1;//set defaut value to 1 (for book category)
          this.currentCategoryName = 'Books';
        } 

        if (this.previousCategoryId!=this.currentCategoryId) {
          this.thePageNumber = 1;
        }

        this.previousCategoryId = this.currentCategoryId;

        //console.log("current category id::"+this.currentCategoryId+" page number is::"+this.thePageNumber);

        return this.productService.getListProductsPaginate(
          this.thePageNumber-1,
          this.thepageSize,
          this.currentCategoryId);
        
      })
    );
  
  this.productsPaginate$.subscribe(
    this.processResults()
    )
    
  }

  handleSearchProducts() {

    this.productsPaginate$=this.route.paramMap.pipe(
      
      switchMap(params => {
        const keywordSearch = params.get('keyword');

        return this.productService.getListProductsByKeywordPaginate(this.thePageNumber-1,
          this.thepageSize,
          keywordSearch);
      })
    );
    this.productsPaginate$.subscribe(
      this.processResults()
    )

  }

  processResults() {
    return data => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thepageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;   
    }
    
  }

  updatePageSize(pageSize: number) {
    this.thePageNumber = 1;
    this.thepageSize = pageSize;
    this.handleListProducts();
  }
  
  addToCart(tempProduct:Product) {
    console.log("the temp Product is::"+tempProduct.name);
    this.cartService.addToCart(new CartItem(tempProduct));
    this.cartService.computeCardTotals();
    //this.cartService.logCartData();

  }
}
