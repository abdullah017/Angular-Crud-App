import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/shared/services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  productForm: any;
  baseUrl =  `${environment.baseUrl}/products`;
  selectedId : number = 0;
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
    console.log(id);
    this.selectedId = +id;
    if (id > 0) {
      //Gelen id değeri ile servise git ve db den id değerini bul modeli getir
      this.productService.getProduct(+id)
      .subscribe(response => {
        //Db den kayıt gelir ise form a set et
        this.productForm.setValue(response);
      }, err=> console.log(err));      
    }
  }
  
  updateProduct(){
    console.log(this.productForm);
    this.productService.updateProducts(this.selectedId,this.productForm.value)
    .subscribe((res)=>{
      console.log(res);
      alert("İŞLEM TAMAM,ANA SAYFAYA YÖNLENDİRİLİYORSUNUZ")
      this.router.navigateByUrl('/home');
    });
      }
}