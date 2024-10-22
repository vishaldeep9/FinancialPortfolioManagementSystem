import { PortfolioService } from './../../services/portfolio.service';
import { Component, OnInit } from '@angular/core';
import {Chart,registerables} from 'node_modules/chart.js'
Chart.register(...registerables);

@Component({
  selector: 'app-allocation',
  templateUrl: './allocation.component.html',
  styleUrls: ['./allocation.component.scss']
})
export class AllocationComponent implements OnInit {

  assetCollection: { [key: string]: number } = {};

  labelData:string[]=[];
  mainData:number[]=[];

  constructor(private portfolioService:PortfolioService){}

  ngOnInit(): void {
this.loadAssetCollection();
  }

  loadAssetCollection() {
    this.portfolioService.getAssetCollection().subscribe(assetCollection => {
      this.assetCollection = assetCollection;  
      
      
      if (this.assetCollection != null) {
        this.labelData = [];
        this.mainData = [];

        for (const key in this.assetCollection) {
          if (this.assetCollection.hasOwnProperty(key)) {
            this.labelData.push(key); 
            this.mainData.push(this.assetCollection[key]); 
          }
        }
        this.renderChart(this.labelData,this.mainData,'doughnut','assetAllocationChart')
      }
    });
  }

  renderChart(labeldata:any,realdata:any,type:any,id:any) {
    const myChart=  new Chart("assetAllocationChart", {
      type: 'doughnut',
      data: {
        labels:labeldata,
        datasets: [{
          label: 'quantity',
          data: realdata,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
