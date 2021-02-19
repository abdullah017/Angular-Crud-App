import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product-model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getProducts():Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}`);
  }

  getProduct(id:number):Observable<Product>{
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  createProducts(product:Product):Observable<Product>{
    return this.http.post<Product>(`${this.baseUrl}`,product);
  }

  updateProducts(id:number, value:any):Observable<Product>{
    return this.http.put<Product>(`${this.baseUrl}/${id}`, value);
  }

  deleteProducts(id: number): Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}${id}`);
  }

}
