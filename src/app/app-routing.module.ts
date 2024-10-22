import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InvestmentFormComponentComponent } from './components/investment-form-component/investment-form-component.component';

const routes: Routes = [
  {path:'',component:DashboardComponent},
  {path:'investment-form',component:InvestmentFormComponentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
