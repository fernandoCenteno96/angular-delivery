import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';
import { ProductDetailComponent } from '../product-detail/product-detail.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  p: number = 1;
  products:Product[]=[];
  constructor(private productService:ProductService) { }

  ngOnInit():void{

    this.productService.getAllProduct().subscribe(resp=>{
     
        this.products=resp;
       
    });
  }
  

}
