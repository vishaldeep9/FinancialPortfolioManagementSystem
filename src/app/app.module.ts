import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AllocationComponent } from './components/allocation/allocation.component';
import { MarketTrendsComponent } from './components/market-trends/market-trends.component';
import { PerformanceMetricsComponent } from './components/performance-metrics/performance-metrics.component';
import { InvestmentFormComponentComponent } from './components/investment-form-component/investment-form-component.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AllocationComponent,
    MarketTrendsComponent,
    PerformanceMetricsComponent,
    InvestmentFormComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
