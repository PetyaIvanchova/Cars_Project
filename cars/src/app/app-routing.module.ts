import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddCarComponent } from './add-car/add-car.component';
import { CarsListComponent } from './cars-list/cars-list.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'create',
    component: AddCarComponent
  },
  {
    path: 'catalog',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: CarsListComponent,
      },
      {
        path: ':id',
        children: [
        {
          path: '',
          pathMatch: 'full',
          component: DetailsComponent
        },{
          path: 'edit',
          component: AddCarComponent
        }
       ]
        
      }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
