import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PropertyComponent } from './property/property.component';
import { MypropertyComponent } from './myproperty/myproperty.component';
import { AddpropertyComponent } from './addproperty/addproperty.component';
import { LeftpanelComponent } from './leftpanel/leftpanel.component';

const routes: Routes = [ {
  path: '',
  component: DashboardComponent
},{
  path: 'property',
  component: PropertyComponent
},
{
  path: 'myproperty',
  component: MypropertyComponent
},
{
  path: 'addproperty',
  component: AddpropertyComponent
},
{
  path: 'leftpanel',
  component: LeftpanelComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
