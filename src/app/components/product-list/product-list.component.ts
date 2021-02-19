import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product-service';
import { environment } from 'src/environments/environment';
import { Product } from 'src/app/shared/models/product-model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  baseUrl = environment.baseUrl;
  products: Product[] = [];
  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.reloadData();
  }
  reloadData() {
    this.productService.getProducts()
      .subscribe(response => this.products = response,
        err => console.log(err));
  }

  deleteOnClick(id: number) {
    if (!confirm('Product deleting..?')) {
      return;
    }
    this.productService.deleteProducts(id)
      .subscribe(response => this.reloadData(), err => console.log(err));
  }


  updateOnClick(id: number) {
    this.router.navigate(['edit/'+id]);
  }

  navigateCreateForm() {
    this.router.navigateByUrl('/create');
  }


}
