import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Investment } from '../models/investment';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  private baseUrl = 'http://localhost:3000/investments';

  constructor(private http: HttpClient) {}

  getAllInvestments(): Observable<Investment[]> {
    return this.http.get<Investment[]>(this.baseUrl).pipe(
      map((investments: Investment[]) => {
        return investments.map((investment) => ({
          ...investment,
           // Convert purchaseDate to Date Object
          purchaseDate: new Date(investment.purchaseDate),
          //adding new property currentValue
          currentValue: this.getCurrentValue(investment),
        }));
      })
    );
  }

  getAssetCollection(): Observable<{ [key: string]: number }> {
    return this.getAllInvestments().pipe(
      map(investments => {
        const assetCollection: { [key: string]: number } = {};
        
        investments.forEach(investment => {
          if (assetCollection[investment.assetType]) {
            assetCollection[investment.assetType] += investment.quantity;
          } else {
            assetCollection[investment.assetType] = investment.quantity;4                                         
          }
        });

        return assetCollection;
      })
    );
  }


addInvestment(investment:Investment):Observable<Investment>
{
  return this.http.post<Investment>(this.baseUrl,investment);
}

  public calculateDailyPerformance(investments:Investment[]):{date:string,profitLoss:number}[]
  {
    const performanceMetrics:{date:string,profitLoss:number}[]=[];
    
    investments.forEach(investment=>{
      //converting date into this YYYY-MM-DD format
         const date= investment.purchaseDate.toISOString().split('T')[0];
         const profitLoss= (investment.currentValue-investment.purchasePrice)*investment.quantity;

         const existingMetrics=performanceMetrics.find(metric => metric.date === date);
         if(existingMetrics){
           existingMetrics.profitLoss+=profitLoss;
         }else {
          performanceMetrics.push({
            date:date,
            profitLoss:profitLoss
          })
         }   
    })
    //sorting date wise 
       return performanceMetrics.sort((a,b)=> new Date(a.date).getTime()-new Date(b.date).getTime() );
  }

  private getCurrentValue(investment: Investment): number {
    // after finding purchasePrice from investment object , converting into some random value
    return investment.purchasePrice * (1 + Math.random() * 0.1);
  }
}
