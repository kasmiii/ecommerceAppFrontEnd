import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from "rxjs//operators";
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl: string = "http://localhost:8080/api/products/search";

  constructor(private httpClient: HttpClient) { }
  
  getProductById(id:number):Observable<Product> {
    
    const url = 'http://localhost:8080/api/products/'+id;

    return this.httpClient.get<Product>(url);

  }

  getListProductsPaginate(thePage: number,
                          thePageSize: number,
                          categoryId: number): Observable<getResponse> {
    
    const searchUrl =this.baseUrl+'/findByCategoryId?id='+categoryId+'&page='+thePage+'&size='+thePageSize;

    return this.httpClient.get<getResponse>(searchUrl);
  }

  getListProducts(categoryId:number): Observable<Product[]> {
    
    const searchUrl =this.baseUrl+'/findByCategoryId?id='+categoryId;

    return this.httpClient.get<getResponse>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getListProductsByKeywordPaginate(thePage: number,
                          thePageSize: number,
                          keyword: string): Observable<getResponse> {
    
    const url = "http://localhost:8080/api/products/search/findByNameContaining?keyword=" + keyword+'&page='+thePage+'&size='+thePageSize;
    
    return this.httpClient.get<getResponse>(url);
  }

  getListCategories():Observable<ProductCategory[]> {
    
    const url = "http://localhost:8080/api/product-category";

    return this.httpClient.get<getResponseCategory>(url).pipe(
      map(data => data._embedded.productCategory)
    );

  }
}

export interface getResponse{
  _embedded:{
    products: Product[];
  }
  , page: {
    size : number,
    totalElements : number,
    totalPages : number,
    number : number
  }
}

interface getResponseCategory{
  _embedded: {
    productCategory: ProductCategory[];
  }
}
