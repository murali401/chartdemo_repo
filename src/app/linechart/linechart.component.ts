import { Chart } from 'chart.js';  
import { Component, OnInit } from '@angular/core';
import { Data } from '../data'; 

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.css']
})


export class LinechartComponent implements OnInit {  
  data: Data[];  
  Player = [];  
  Run = [];  
  Linechart :Chart;
  constructor() { }  
   


/*function removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}; */ 
   
  ngOnInit() {  
 //https://www.digitalocean.com/community/tutorials/understanding-date-and-time-in-javascript
 //https://www.c-sharpcorner.com/article/create-charts-in-angular-7-application-using-chart-js2/
 //https://dev.to/wiaio/implementing-a-chartjs-line-chart-in-your-angular-application-19d7
      this.Linechart = new Chart('canvas', {
        type: 'line',
        data: {
            //labels: ['2019-12-02 10:00', '2019-12-02 10:10', '2019-12-02 10:20', '2019-12-02 10:30', '2019-12-02 10:40', '2019-12-02 10:50'],
            datasets: [{
                label: '# of Votes',
                //data: [12, 19, 3, 5, 2, 3, 7],
                data: [
                        {x: new Date().setSeconds(0), y: 1}, 
                        {t: new Date().setSeconds(20), y: 100},
                        {x: new Date().setSeconds(40), y: 10},
                        {x: new Date().setSeconds(60), y: 250},
                        {x: new Date().setSeconds(70), y: 150},
                        {x: new Date().setSeconds(80), y: 200}
                    ],
                        
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }],
                xAxes: [{
                type: 'time',
                time: {
                    unit: 'second'
                }
            }]
            }
        }
    });
        
        
         setTimeout(() => {
            console.log("World!"); 
            this.removeData(); 
         }, 2000);
 
 
    }
    
    removeData(){
        this.Linechart.data.labels.pop(); 
        this.Linechart.data.datasets.forEach((dataset) => {
                dataset.data.pop();
                    });
        this.Linechart.update(); 
    }
    
    /* addData() {
   data: [
                        {x: new Date().setSeconds(90), y: 300}, 
                        {t: new Date().setSeconds(100), y: 400},
                        {x: new Date().setSeconds(110), y: 50},
                        {x: new Date().setSeconds(120), y: 50},
                        {x: new Date().setSeconds(130), y: 90},
                        {x: new Date().setSeconds(140), y: 170}
                    ];
    this.Linechart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    this.Linechart.update();
} */
}