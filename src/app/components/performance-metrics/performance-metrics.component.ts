import { PortfolioService } from 'src/app/services/portfolio.service';
import { Component, OnInit } from '@angular/core';
import { Investment } from 'src/app/models/investment';

@Component({
  selector: 'app-performance-metrics',
  templateUrl: './performance-metrics.component.html',
  styleUrls: ['./performance-metrics.component.scss'],
})
export class PerformanceMetricsComponent implements OnInit {
  
  totalInvestment: number = 0;
  profitLoss: number = 0;

  constructor(private portfolioService: PortfolioService) {}


  ngOnInit(): void {
    this.portfolioService.getAllInvestments().subscribe((investments) => {
      this.totalInvestment = this.calculateTotalInvestment(investments);
      this.profitLoss = this.calculateProfitLoss(investments);
    });
  }


  private calculateProfitLoss(investments: Investment[]): number {
    return investments.reduce((total, investment) => {
      const profitLoss =
        (investment.currentValue - investment.purchasePrice) *
        investment.quantity;
      return total + profitLoss;
    }, 0);
  }


  private calculateTotalInvestment(investments: Investment[]): number {
    return investments.reduce((total, investment) => {
      return total + investment.purchasePrice * investment.quantity;
    }, 0);
  }

}
