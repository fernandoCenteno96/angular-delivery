import { Injectable } from '@angular/core';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {map ,delay} from 'rxjs/operators';
import { pipe } from 'rxjs';

import { AngularFireStorage } from '@angular/fire/storage';
import 'firebase/storage';
import { AngularFirestore } from '@angular/fire/firestore';

import { Product } from 'src/app/models/product.model';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  Url='https://crud-45d38.firebaseio.com';
  urlImg:string;
 
  constructor(private http:HttpClient,
              private storage: AngularFireStorage
              ) { }


  getById(id:string){

    return this.http.get(`${this.Url}/products/${id}.json`);
  }


  getAllProduct(){

    return this.http.get(`${this.Url}/products.json`)
              .pipe(
                map(this.crearArreglo)
              );
  }

  private crearArreglo(productsObj:Object){
    const products:Product[]=[];
    
    if(productsObj==null){return [];}

    Object.keys(productsObj).forEach(key=>{
      const produt:Product=productsObj[key];
      
      produt.id=key;
      
      products.push( produt );
    });
    
    return products;
  }

  createProduct(product:Product){

   return this.http.post(`${this.Url}/products.json`,product)
                .pipe(
                  map((resp:Product)=>{
                    product.id=resp.name;
                    return product;
                  })
                );
  }
  UpdateProduct(product:Product){
    
    const producTemp={
      ...product
    }
    delete producTemp.id;
    return this.http.put(`${this.Url}/products/${product.id}.json`,producTemp);
  }

  Delete(id:string){
    return this.http.delete(`${this.Url}/products/${id}.json`);
  }
}
