import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { LoginComponent } from './components/services/login/login.component';
import { RegisterComponent } from './components/services/register/register.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'product', component: ProductComponent ,canActivate:[AuthGuard]},
  { path: 'newproduct', component: ProductCreateComponent,canActivate:[AuthGuard]},
  { path: 'newproduct/:id', component: ProductCreateComponent,canActivate:[AuthGuard]},
  { path: 'detailProduct/:id', component: ProductDetailComponent},
  {path: 'login',component:LoginComponent},
  {path:'singin',component:RegisterComponent},
  { path: '**', pathMatch:'full', redirectTo:'' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
