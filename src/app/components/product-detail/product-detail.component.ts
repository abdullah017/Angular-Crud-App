import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/shared/models/product-model';
import { ProductService } from 'src/app/shared/services/product-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {   productForm: any;
   baseUrl = environment.baseUrl;
   selectedId : number = 0;
   product:Product | null = null;

   constructor(
     private productService:ProductService,
     private activatedRouter:ActivatedRoute,
     private formBuilder:FormBuilder,
     private router:Router
   ) {
     this.productForm = this.formBuilder.group({
       id:[0,[]],
       name:['', [Validators.required,Validators.minLength(5)]],
       category:['',[Validators.required,Validators.minLength(4)]],
       description:['',[Validators.required,Validators.minLength(4)]],
       price:['',[Validators.required]],
       imagePath:['',[Validators.required]],
     });
   }
   ngOnInit(): void {
     //Url den gelen id değerini oku eğer ki null ise 0 değerini ata
     const id = this.activatedRouter.snapshot.paramMap.get('id') ?? 0;  
     const name = this.activatedRouter.snapshot.paramMap.get('name');
     if(id == 0 || name == null){
       alert('hata');
       return;
     }

     this.selectedId = +id;
     if (this.selectedId > 0) {
       //Gelen id değeri ile servise git ve db den id değerini bul modeli getir
       this.productService.getProduct(+id)
       .subscribe(response => {
         this.product = response;
       }, err=> console.log(err));      
     }
   }
   
   updateProduct(){
     console.log(this.productForm);
     this.productService.updateProducts(this.selectedId,this.productForm.value)
     .subscribe((res)=>{
       console.log(res);
       this.router.navigateByUrl('/home');
     });
   }
 }