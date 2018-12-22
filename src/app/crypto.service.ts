import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CryptoService 
{
  
  public Currency;
  private currencyComparision;
  
  //base URL for API 
  public baseUrl = 'https://api.coinmarketcap.com/v2/ticker/';
 
  constructor(private _http : HttpClient) { }
  

  //method to get all currency in table
  public getAllCurrency() :any
  {
     let Currency = this._http.get(this.baseUrl);
     //console.log(Currency);
      return Currency;
  }

  //method to get single currency from table
   public getCurrentCoinInfo(currentCoinId): any
  {
    let myResponse = this._http.get(this.baseUrl + currentCoinId + "/");
    return myResponse;
  }

  public getSingleCurrencyData(id): Observable<any> 
  {
    return this._http.get(`${this.baseUrl}${id}/`);
  }

  public setCurrenciesToCompare(crypto_page: number, ids: number[]): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      this._http.get(`${this.baseUrl}?start=${crypto_page}&structure=array&sort=rank`).toPromise().then((currencies:any) => {
        const data = [];
        for(let item of currencies.data){
          if(ids.findIndex((id) => id === item.id) !== -1) {
            data.push(item);
          }
        }
        this.currencyComparision = data;
        resolve();
      });
    });
    return promise;       
  }
  

  //method to get specific currency for graph
  public getCurrenciesToCompare(): any 
  {
      return this.currencyComparision;
  }
}
