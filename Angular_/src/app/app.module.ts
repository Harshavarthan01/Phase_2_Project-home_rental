import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource } from '@angular/material/table';
import { TogglemenuComponent } from './togglemenu/togglemenu.component';
import { PropertyComponent } from './property/property.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MypropertyComponent } from './myproperty/myproperty.component';
import { AddpropertyComponent } from './addproperty/addproperty.component';
import { LeftpanelComponent } from './leftpanel/leftpanel.component';
import { BecomeownerpopupComponent } from './becomeownerpopup/becomeownerpopup.component';
import { HeaderComponent } from './header/header.component';
import { NgxPaginationModule } from 'ngx-pagination';
// import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { WishlistComponent } from './wishlist/wishlist.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { DatePipe } from '@angular/common';
import { AboutusComponent } from './aboutus/aboutus.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TogglemenuComponent,
    PropertyComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    MypropertyComponent,
    AddpropertyComponent,
    LeftpanelComponent,
    BecomeownerpopupComponent,
    HeaderComponent,
    WishlistComponent,
    UserprofileComponent,
    AboutusComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    NgxPaginationModule,
    HttpClientModule,
    DatePipe,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
