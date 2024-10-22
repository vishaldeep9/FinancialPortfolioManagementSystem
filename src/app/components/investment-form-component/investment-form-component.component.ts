import { PortfolioService } from 'src/app/services/portfolio.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-investment-form-component',
  templateUrl: './investment-form-component.component.html',
  styleUrls: ['./investment-form-component.component.scss']
})
export class InvestmentFormComponentComponent implements OnInit{
  
 investmentFormData!:FormGroup;

  constructor(private portfolioService:PortfolioService,private route:Router){}

  ngOnInit(): void 
  {
   this.investmentFormData=new FormGroup({
    assetType:new FormControl("",Validators.required),
    quantity:new FormControl(0,[Validators.required, Validators.min(1)]),
    purchasePrice:new FormControl(0,[Validators.required, Validators.min(0)]),
    purchaseDate:new FormControl("",Validators.required)
   })
  }
  makeInvestment(){
   this.portfolioService.addInvestment(this.investmentFormData.value).subscribe((response)=>{
    alert(`investment successfully`);
    this.route.navigate([''])
   },(error)=>{
    console.log(error)
   })
  }
}
