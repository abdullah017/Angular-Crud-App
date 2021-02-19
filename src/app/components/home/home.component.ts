import { ProductService } from 'src/app/shared/services/product-service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product-model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  productForm: any;
  constructor(
    private productService:ProductService,
    private activatedRouter:ActivatedRoute,
    private router: Router) { }
  products: Product[] = [];

  ngOnInit() {
    return this.productService.getProducts().subscribe(response => this.products = response,
      err => console.log(err))
  }

  onClickView(id:number,name:string,category:string){

    console.log(id,name);
    //console.log('details/'+id/+name);

    this.router.navigate(['details/'+id+'/'+name], { queryParams: { category: category } });
  }
  onClickEdit(id:number,name:string,category:string){
    console.log(id,name);
    this.router.navigate(['edit/'+id+'/'+name], { queryParams: { category: category } });
  }

}
