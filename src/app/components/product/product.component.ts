import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  p: number = 1;
  products:Product[]=[];
  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.productService.getAllProduct().subscribe(resp=>{
        this.products=resp;
    });
  }
  
  deleteProduct(product:Product,i:number){

    Swal.fire({
      title:'¿Esta seguro?',
      text:`¿Esta seguro que desea borrar a ${product.name}?`,
      icon:'question',
      showConfirmButton:true,
      showCancelButton:true
    }).then(resp=>{
      if(resp.value){

         this.products.splice(i,1);
         this.productService.Delete(product.id).subscribe();
         this.products;
         Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Eliminado Correctamente',
              showConfirmButton: false,
              timer: 1500
        });

      }
    });
   

  }

}
