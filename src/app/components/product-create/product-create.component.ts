import { ProductService } from 'src/app/shared/services/product-service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  productForm: any;
 
  constructor(
    private productService:ProductService,
    private formBuilder: FormBuilder,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name:['', [Validators.required,Validators.minLength(5)]],
      category:['',[Validators.required,Validators.minLength(4)]],
      description:['',[Validators.required,Validators.minLength(4)]],
      price:['',[Validators.required]],
      image:['',[Validators.required]],
    });
  }

  saveProduct(){
    //sen de form builder clear value diye temizlemeyi aratırsın.
    console.log(this.productForm);
    this.productService.createProducts(this.productForm.value)
        .subscribe((res)=>{
          if (res.id > 0) {
            this.router.navigate(['/products']);
          }
        });
  }
}
