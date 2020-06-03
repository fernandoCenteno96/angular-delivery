import { Component, OnInit,Input, ɵConsole } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
 product=new Product();
 params:object;
  constructor(private productService:ProductService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    const id=this.route.snapshot.paramMap.get('id');
     this.productService.getById(id).subscribe((resp:Product)=>{
       
       this.product=resp;
       this.product.id=id;
     })
  }

}
