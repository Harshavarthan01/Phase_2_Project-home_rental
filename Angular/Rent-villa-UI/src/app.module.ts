import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
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
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
