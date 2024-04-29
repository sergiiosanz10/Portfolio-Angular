import { Component, Input, OnChanges, OnInit } from '@angular/core';
import {  List } from '../../interfaces/forecast.interface';
import { Graphic, Series } from '../../interfaces/graphic.interface';


@Component({
  selector: 'graphic-page',
  templateUrl: './graphic-page.component.html',
  styleUrl: './graphic-page.component.scss'
})
export class GraphicPageComponent implements OnInit, OnChanges{
  @Input({required: true}) search: List[] | undefined;

  ngOnInit(): void {
    this.multi =  this.getGraphics()
    console.log(this.multi);
  }

  ngOnChanges( ):void {
    this.multi =  this.getGraphics()
  }


  multi: Graphic[] = []
  view: [number, number] = [1000, 400];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Dias';
  yAxisLabel: string = 'Grados';
  timeline: boolean = true;


  getGraphics(): Graphic[]{

    let graphicsTemp: Graphic[] = []
    let line: Graphic={
      name: 'Temperatura',
      series:this.getTemp()
    };
    let line2: Graphic={
      name: 'Temperatura Max',
      series:this.getTempMax()
    };
    let line3: Graphic={
      name: 'Temperatura Min',
      series:this.getTempMin()
    };
    graphicsTemp.push(line2, line3, line)
    return graphicsTemp
  }

  getTemp(): Series[]{
    if(this.search==undefined){


      return []
    }else{

  return this.search.map(
        day => {
          return {
            name: new Date(day.dt*1000).toLocaleDateString(),
            value: day.temp.day
            }
        }
      )

    };
  }

  getTempMax(){
    if(this.search==undefined){


      return []
    }else{

  return this.search.map(
        day => {
          return {
            name: new Date(day.dt*1000).toLocaleDateString(),
            value: day.temp.max
            }
        }
      )

    };
  }
  getTempMin(){
    if(this.search==undefined){


      return []
    }else{

  return this.search.map(
        day => {
          return {
            name: new Date(day.dt*1000).toLocaleDateString(),
            value: day.temp.min
            }
        }
      )

    };
  }

}
