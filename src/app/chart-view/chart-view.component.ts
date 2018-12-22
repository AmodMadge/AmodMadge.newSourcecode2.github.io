import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ActivatedRoute, Router } from '@angular/router';

import { CryptoService } from '../crypto.service';

@Component({
  selector: 'app-chart-view',
  templateUrl: './chart-view.component.html',
  styleUrls: ['./chart-view.component.css']
})
export class ChartViewComponent implements OnInit {

  public id: any;
  public singleCurrencyData: any;
  LineChart = [];
  public currentCoin;
  public myCurrentCoin;
  coinData;

  constructor(public listService: CryptoService, private router: Router,  public _route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this._route.snapshot.paramMap.get('id');
    this.getSingleData();

    this.currentCoin = this._route.snapshot.paramMap.get('id');
    console.log(this.currentCoin);
    this.getSingleData();
    
    this.listService.getCurrentCoinInfo(this.currentCoin).subscribe(
      data => { 
        this.coinData = data;
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }

  public getSingleData = () => {

    this.listService.getSingleCurrencyData(this.id).subscribe((apiResponse) => {
      this.singleCurrencyData = apiResponse.data;
      
      /*LineChart*/
      this.LineChart = new Chart('lineChart', {
        type: 'line',
        data: {
          labels: [0, 24],
          datasets: [
            {
              label: this.singleCurrencyData.name,
              data: [{
                x: 0,
                y: this.singleCurrencyData.quotes.USD.price - (this.singleCurrencyData.quotes.USD.price * this.singleCurrencyData.quotes.USD.percent_change_24h/100)
              }, {
                x: 24,
                y: this.singleCurrencyData.quotes.USD.price
              }], 
              fill: false,
              lineTension: 0.2,
              borderColor: "blue",
              borderWidth: 2
            }]
        },
        options: {
          title: {
            text: "Line Chart",
            display: true
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      })

    })

  }

  goBack = () => {
    this.router.navigateByUrl("/");
  }

}