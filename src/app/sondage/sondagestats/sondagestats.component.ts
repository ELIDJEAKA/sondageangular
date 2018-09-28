import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { environment } from '../../../environments/environment';
import { Router,RouterModule, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { barChartSingle, barChartmulti, pieChartSingle, pieChartmulti, lineChartSingle, lineChartMulti, areaChartSingle, areaChartMulti } from '../../shared/data/ngxChart';
import * as chartsData from '../../shared/configs/ngx-charts.config';
import { ErreurService } from "../../webservices/erreur.service"
import { SondageService } from "../../webservices/sondage.service"
import { SimulateurService } from "../../webservices/simulateur.service"


declare var require: any;

const data: any = require('../../shared/data/chartist.json');

@Component({
  selector: 'app-sondagestats',
  templateUrl: './sondagestats.component.html',
  styleUrls: ['./sondagestats.component.scss'],
  providers : [ErreurService,SondageService,SimulateurService]
})
export class SondagestatsComponent implements OnInit {

  erreur : any;
  contre : any;
  simulateur : any;
  pointfort : any;
  axeamelioration : any;

  //Chart Data
  lineChartMulti = lineChartMulti;
  areaChartMulti = areaChartMulti;
  barChartmulti = barChartmulti;
  pieChartSingle = pieChartSingle;

  //Bar Charts
  barChartView: any[] = chartsData.barChartView;

  // options
  barChartShowYAxis = chartsData.barChartShowYAxis;
  barChartShowXAxis = chartsData.barChartShowXAxis;
  barChartGradient = chartsData.barChartGradient;
  barChartShowLegend = chartsData.barChartShowLegend;
  barChartShowXAxisLabel = chartsData.barChartShowXAxisLabel;
  // barChartXAxisLabel = chartsData.barChartXAxisLabel;
  barChartXAxisLabel = "Votes";
  barChartShowYAxisLabel = chartsData.barChartShowYAxisLabel;
  // barChartYAxisLabel = chartsData.barChartYAxisLabel;
  barChartYAxisLabel = "Raisons";
  barChartColorScheme = chartsData.barChartColorScheme;

  //Pie Charts

  pieChartView: any[] = chartsData.pieChartView;

  // options
  pieChartShowLegend = chartsData.pieChartShowLegend;

  pieChartColorScheme = chartsData.pieChartColorScheme;

  // pie
  pieChartShowLabels = chartsData.pieChartShowLabels;
  pieChartExplodeSlices = chartsData.pieChartExplodeSlices;
  pieChartDoughnut = chartsData.pieChartDoughnut;
  pieChartGradient = chartsData.pieChartGradient;

  pieChart1ExplodeSlices = chartsData.pieChart1ExplodeSlices;
  pieChart1Doughnut = chartsData.pieChart1Doughnut;


  //Line Charts

  lineChartView: any[] = chartsData.lineChartView;

  // options
  lineChartShowXAxis = chartsData.lineChartShowXAxis;
  lineChartShowYAxis = chartsData.lineChartShowYAxis;
  lineChartGradient = chartsData.lineChartGradient;
  lineChartShowLegend = chartsData.lineChartShowLegend;
  lineChartShowXAxisLabel = chartsData.lineChartShowXAxisLabel;
  lineChartXAxisLabel = chartsData.lineChartXAxisLabel;
  lineChartShowYAxisLabel = chartsData.lineChartShowYAxisLabel;
  lineChartYAxisLabel = chartsData.lineChartYAxisLabel;

  lineChartColorScheme = chartsData.lineChartColorScheme;

  // line, area
  lineChartAutoScale = chartsData.lineChartAutoScale;
  lineChartLineInterpolation = chartsData.lineChartLineInterpolation;

  //Area Charts

  areaChartView = chartsData.areaChartView;

  // options
  areaChartShowXAxis = chartsData.areaChartShowXAxis;
  areaChartShowYAxis = chartsData.areaChartShowYAxis;
  areaChartGradient = chartsData.areaChartGradient;
  areaChartShowLegend = chartsData.areaChartShowLegend;
  areaChartShowXAxisLabel = chartsData.areaChartShowXAxisLabel;
  areaChartXAxisLabel = chartsData.areaChartXAxisLabel;
  areaChartShowYAxisLabel = chartsData.areaChartShowYAxisLabel;
  areaChartYAxisLabel = chartsData.areaChartYAxisLabel;

  areaChartColorScheme = chartsData.areaChartColorScheme;

  // line, area
  areaChartAutoScale = chartsData.areaChartAutoScale;
  areaChartLineInterpolation = chartsData.areaChartLineInterpolation;


  constructor(private erreurService:ErreurService,
              private sondageService:SondageService,
              private simulateurService:SimulateurService,
            ) {
    Object.assign(this, { barChartSingle, barChartmulti, pieChartSingle, pieChartmulti, lineChartSingle, lineChartMulti, areaChartSingle, areaChartMulti })
    this.getErreurs();
    this.getSondages();
    this.getSimulateur();
    this.getPointfort();
    this.getAxeamelioration();
}

  ngOnInit() {
  }

  public getErreurs(){
    this.erreurService.getErreurs().subscribe(
      posts => {
        let res : any = [];
        posts.forEach(function(elt){
          res.push({"name": elt.name, "value": elt.nombre});
        });
        console.log(res);
        this.erreur = res;
      }
    );
  }

  public getSondages(){
    console.log("get sondage")
    this.sondageService.getSondageByQuestion("contre").subscribe(
      posts => {
        let res : any = [];
        posts.forEach(function(elt){
          res.push({"name": elt.name, "value": elt.nombre});
        });
        console.log(res);
        this.contre = res;
      }
    );
  }
  public getPointfort(){
    console.log("get sondage")
    this.sondageService.getSondageByQuestion("pointfort").subscribe(
      posts => {
        let res : any = [];
        posts.forEach(function(elt){
          res.push({"name": elt.name, "value": elt.nombre});
        });
        console.log(res);
        this.pointfort = res;
      }
    );
  }
  public getAxeamelioration(){
    console.log("get sondage")
    this.sondageService.getSondageByQuestion("axeamelioration").subscribe(
      posts => {
        let res : any = [];
        posts.forEach(function(elt){
          res.push({"name": elt.name, "value": elt.nombre});
        });
        console.log(res);
        this.axeamelioration = res;
      }
    );
  }


  public getSimulateur(){
    console.log("get sondage")
    this.simulateurService.getSimulateurs().subscribe(
      posts => {
        let res : any = [];
        posts.forEach(function(elt){
          res.push({"name": elt.candidat.name, "value": elt.nombre_partisans});
        });
        console.log(res);
        this.simulateur = res;
      }
    );
  }

}
