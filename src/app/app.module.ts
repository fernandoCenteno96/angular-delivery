import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';

import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import{ReactiveFormsModule, FormsModule }from '@angular/forms'
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NabvarComponent } from './components/nabvar/nabvar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { environment } from '../environments/environment';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { LoginComponent } from './components/services/login/login.component';
import { RegisterComponent } from './components/services/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    NabvarComponent,
    FooterComponent,
    HomeComponent,
    ProductComponent,
    ProductCreateComponent,
    ProductDetailComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
