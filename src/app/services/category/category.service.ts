import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { CategoryModel } from 'src/app/models/category.model';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  Url:string='https://crud-45d38.firebaseio.com';
  constructor(private http:HttpClient) { }

 

  getAll(){

    return this.http.get(`${this.Url}/categorys.json`)
                .pipe(
                  map(this.crearArreglo)
                );
  }

  private crearArreglo(categoryObj:Object){
    const categorys:CategoryModel[]=[];
    
    if(categoryObj==null){return [];}

    Object.keys(categoryObj).forEach(key=>{
      const category:CategoryModel=categoryObj[key];
      
      category.id=key;
      
      categorys.push( category );
    });
    
    return categorys;
  }
}

