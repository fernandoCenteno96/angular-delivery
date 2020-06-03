import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category/category.service';
import { CategoryModel } from 'src/app/models/category.model';
import { ProductService } from '../../services/product.service';
import { AngularFireStorage } from '@angular/fire/storage';
import 'firebase/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from 'src/app/models/product.model';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  formProduct:FormGroup;
  categorys:CategoryModel[]=[];
  imagenUrl:string='';
  product:Product=new Product();
  ruta:string;
  update:boolean=false;
  id:string;
  fd=new FormData();
  porcentaje:number=0;
  constructor(
    private fb:FormBuilder,
    private categoryServices:CategoryService,
    private productServices:ProductService,
    private storage: AngularFireStorage,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
   this.id=this.route.snapshot.paramMap.get('id');
    if (this.id!=='new') {
      this.productServices.getById(this.id).subscribe((resp:Product)=>{
          this.product=resp;
          this.imagenUrl=resp.imgUrl;
          
      });
      this.update=true;
    }
     this.categoryServices.getAll().subscribe(resp=>{
          this.categorys=resp;
      });
    this.formProduct=this.fb.group({
      name:['',Validators.required],
      description:['',Validators.required],
      price:['',Validators.required],
      stock:['',Validators.required],
      imgUrl:['',Validators.required],
      category:['',Validators.required]
    });

  }

    onFileSelected(event){
      if(event.target.files.length > 0 ){
        
        let file =event.target.files[0];
        let filename=new Date().getTime().toString();
        let extencion=file.name.toString().substring(file.name.toString().lastIndexOf('.'))
        let ruta = 'products/'+filename+extencion;  
        const ref = this.storage.ref(ruta);
        const task = ref.put(file);
        task.percentageChanges().subscribe((porcentajesubida)=>{
        this.porcentaje=parseInt(porcentajesubida.toString());
          
        
        
        });
          task.then((objeto)=>{
            ref.getDownloadURL().subscribe((url)=>{
    
              this.imagenUrl= url
              } );
          });
      }  
    }

    save(){
      this.product=this.formProduct.value;
      this.product.imgUrl=this.imagenUrl;
      Swal.fire({
        title:'Espere',
        text:'Guardando informacion',
        icon:'info',
        allowOutsideClick:false
      });
     Swal.showLoading();
     
      this.productServices.createProduct(this.product).subscribe(resp=>{
          Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Producto Guardado Correctamente',
                showConfirmButton: false,
                timer: 2500
          });
         this.formProduct.reset();
         this.porcentaje=0;
      });  
    }
    updateProduct(){
      Swal.fire({
        title:'Espere',
        text:'Guardando informacion',
        icon:'info',
        allowOutsideClick:false
      });
      Swal.showLoading();
        this.product=this.formProduct.value;
        this.product.imgUrl=this.imagenUrl;
        this.product.id=this.id;    
        this.productServices.UpdateProduct(this.product).subscribe(resp=>{
        });
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Producto Actualizado Correctamente',
        showConfirmButton: false,
        timer: 2500
       });
      this.formProduct.reset();
    }


}
