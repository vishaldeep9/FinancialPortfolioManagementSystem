export interface Investment {
    assetType: 'Stocks' | 'Bonds' | 'Real Estate'; 
    quantity: number;    
    purchasePrice: number; 
    purchaseDate: Date;    
    currentValue: number; 
}
