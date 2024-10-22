import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js';
import { PortfolioService } from 'src/app/services/portfolio.service';
Chart.register(...registerables);

@Component({
  selector: 'app-market-trends',
  templateUrl: './market-trends.component.html',
  styleUrls: ['./market-trends.component.scss'],
})
export class MarketTrendsComponent implements OnInit {

  marketPerformanceMetrics:{date:string,profitLoss:number}[]=[]

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
  this.loadMarketPerformanceMetrics();
  }
   
  loadMarketPerformanceMetrics(){
    this.portfolioService.getAllInvestments().subscribe((investments)=>{
      this.marketPerformanceMetrics=this.portfolioService.calculateDailyPerformance(investments);
      console.log(this.marketPerformanceMetrics)
      this.renderChart()
   })
  }

  renderChart() {
    
   const labels=this.marketPerformanceMetrics.map(metric=>metric.date);
   const data=this.marketPerformanceMetrics.map(metric=>metric.profitLoss);

   const myChart = new Chart('marketTrendsChart', {
    type: 'bar',
    data: {
      labels: labels, //column
      datasets: [{
        label: 'Profit/Loss',
        data: data, //row (here it show profitLoss during hover)
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: (value) => value.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })
          }     
        }
        
      }
    }
  });
  }
}
