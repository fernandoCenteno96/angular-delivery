import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category/category.service';
import { CategoryModel } from '../../models/category.model';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nabvar',
  templateUrl: './nabvar.component.html',
  styleUrls: ['./nabvar.component.css']
})
export class NabvarComponent implements OnInit {
  categorys:CategoryModel[]=[];
  bandera=false;
  constructor(private categoryService:CategoryService,
              private auth:AuthService,
              private router:Router
    ) { }

  ngOnInit(): void {

    this.categoryService.getAll().subscribe(resp=>{
        this.categorys=resp;
    });
    if(this.auth.loginStatus()){
      this.bandera=true;
    }

  }
  logout(){
    this.auth.logout();
    this.router.navigateByUrl('/');
    this.bandera=false;
  }
}
