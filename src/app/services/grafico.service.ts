import { Injectable } from '@angular/core';
import { Chart } from 'angular-highcharts';


@Injectable({
  providedIn: 'root'
})
export class GraficoService {

  constructor() { }

  crearGraficoBarras(param1:any, param2:any, titulo:string, xAxisTitle:string, yAxisTitle:string, sufijo:string)
  {
    return new Chart({
      chart:{
        type:'bar',
        backgroundColor: 'gray'
      },
      title:{
        text:titulo
      },
      xAxis:{
        categories:param1,
        title:{
          text:xAxisTitle
        }
      },
      yAxis:{
        min:0,
        title:{
          text:yAxisTitle,
          align:'high'
        },
        labels:{
          overflow:'justify'
        }
      },
      tooltip: {
        valueSuffix: ' '+sufijo
      },
      plotOptions: {
          bar: {
              dataLabels: {
                  enabled: true
              }
          }
      },
      legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'top',
          x: -40,
          y: 80,
          floating: true,
          borderWidth: 1,
          shadow: true
          
      },
      credits: {
          enabled: false
      },
      series: [
        {
          type:'bar',
          data: param2,
        }
      ]
    });
  }

  crearGraficoTorta(param1:any, param2:any, titulo:string, xAxisTitle:string, yAxisTitle:string, sufijo:string)
  {
    return new Chart({
      chart:{
        type:'pie',
        backgroundColor: 'gray'
      },
      title:{
        text:titulo
      },
      xAxis:{
        categories:param1,
        title:{
          text:xAxisTitle
        }
      },
      yAxis:{
        min:0,
        title:{
          text:yAxisTitle,
          align:'high'
        },
        labels:{
          overflow:'justify',
         
        }
      },
      tooltip: {
        valueSuffix: ' '+sufijo
      },
      plotOptions: {
          bar: {
              dataLabels: {
                  enabled: true
              }
          }
      },
      legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'top',
          x: -40,
          y: 80,
          floating: true,
          borderWidth: 1,
          shadow: true
          
      },
      credits: {
          enabled: false
      },
      series: [{
        type: 'pie',
        data: [{
            name: '27/6/2022',
            y: 3,
          }, {
            name: '17/6/2022',
            y: 2,
          }, {
            name: '18/6/2022',
            y: 2,
          },
          {
            name: '24/6/2022',
            y: 4,
          },
          {
            name: '1/7/2022',
            y: 1,
          },
          {
            name: '20/6/2022',
            y: 2,
          },
          {
            name: '15/6/2022',
            y: 2,
          },
          {
            name: '13/6/2022',
            y: 1,
          },
          {
            name: '10/6/2022',
            y: 2,
          },
          {
            name: '14/6/2022',
            y: 1,
          },
        ],
       
    
      
          
        
      }]
    
    })}}