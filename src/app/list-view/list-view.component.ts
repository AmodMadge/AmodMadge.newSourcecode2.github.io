import { Component, OnInit } from '@angular/core';
import { CryptoService } from '../crypto.service';
import { ActivatedRoute, Router } from '@angular/router';
//import local storage for storing coins
import { LOCAL_STORAGE } from 'angular-webstorage-service';
import 'hammerjs';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit 
{

  public allCurrency = [];
  public arr = [];
  public arrCopy = [];
  p: number = 1;
  public favData = [];
  public selected: any;
  public comparsionId = [];
  public displaycheckbox: boolean = false;
  public key: string;
  public result = [];
  public reverse: boolean = false;
  crypto_Page_Start = 1;
  compareList = [];
  compareView = false;

  constructor(
    private _route: ActivatedRoute, 
    private router: Router, 
    public listService: CryptoService
    ) { }

  ngOnInit() {

    this.listService.getAllCurrency().subscribe
    (
      data => {
        this.allCurrency = data.data;
   //     console.log(this.allCurrency);
        for (let element in this.allCurrency) 
        {
          this.arr.push(this.allCurrency[element]);
        }
        this.arrCopy = this.arr;
      },
      error => {
        console.log(error);
      }
    )

  }

  //method to sort price and market cap
  public sort(key) 
  {
    this.key = key;
    //  console.log(this.key);
    this.reverse = !this.reverse;
  }
  // for range slider function
  public myOnFinish(event1, type) {
    let min = event1.from;
    let max = event1.to;
    if (type === 'marketCap') {
      if (this.result.length > 0) {
        this.result = this.result.filter(word => (word.quotes.USD.market_cap > min && word.quotes.USD.market_cap < max));
      } else {
        this.result = this.arrCopy.filter(word => (word.quotes.USD.market_cap > min && word.quotes.USD.market_cap < max));
      }
    } else {
      if (this.result.length > 0) {
        this.result = this.result.filter(word => (word.quotes.USD.price > min && word.quotes.USD.price < max));
      } else {
        this.result = this.arrCopy.filter(word => (word.quotes.USD.price > min && word.quotes.USD.price < max));
      }
    }
    this.arr = this.result;
  }
  // method for fav selected coin in local storage
  onSelect(j) 
  { 
    let key = 'id';
    this.favData.push(j);
    localStorage.setItem(key, JSON.stringify(this.favData));
    this.selected = (this.selected === j ? null : j);
  }
  //method to show favourite coin 
  isActive(j) 
  {
    return this.selected === j;
  };
  // methhod for select coin by checkbox 
  
  initComapareView = () => 
  {
    this.compareView = true;
  }

  manageComparisionList = (currencyId: number) => 
  {
    const index = this.compareList.findIndex((item) => item === currencyId);
    if (index === -1) 
    {
      this.compareList.push(currencyId);
    } else 
    {
      // If item unchecked, remove it from list
      this.compareList.splice(index, 1);
    }

  }

  public compareCurrencyHandler = () => 
  {
    if (this.compareList.length !== 2) 
    {
      alert('You must select 2 items');
      return;
    }
    this.listService.setCurrenciesToCompare(this.crypto_Page_Start, this.compareList).
    then(() => {
      this.router.navigate(['/comparisonView']);
    });

  }

}
