import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PropertyComponent } from './property/property.component';
import { MypropertyComponent } from './myproperty/myproperty.component';
import { AddpropertyComponent } from './addproperty/addproperty.component';
import { LeftpanelComponent } from './leftpanel/leftpanel.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { AboutusComponent } from './aboutus/aboutus.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'property',
    component: PropertyComponent,
  },
  {
    path: 'myproperty',
    component: MypropertyComponent,
  },
  {
    path: 'addproperty',
    component: AddpropertyComponent,
  },
  {
    path: 'leftpanel',
    component: LeftpanelComponent,
  },
  {
    path: 'wishlist',
    component: WishlistComponent,
  },
  {
    path: 'myprofile',
    component: UserprofileComponent,
  },
  {
    path: 'aboutus',
    component: AboutusComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
