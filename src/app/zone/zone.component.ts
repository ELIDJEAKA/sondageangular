import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DatatableComponent } from "@swimlane/ngx-datatable/release";
import { environment } from '../../environments/environment';


import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router,RouterModule, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NgForm, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { ZoneService } from "../webservices/zone.service"

declare var require: any;
var data: any = require('../shared/data/company.json');

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.scss'],
  providers : [ZoneService]
})
export class ZoneComponent implements OnInit {
  modalReference: any;
  rows = [];
  temp = [];
  filteredData = [];
  loadingIndicator: boolean = true;
  reorderable: boolean = true;

  clients  : any;
  zones  : any;
  zone : any = {"chef_zone":"", "nb_partisans": 0, "couvert":"oui", "event" : 0, "statut":0, "quartier" : ""}; // the zone seclected
  options : any = {title : 'Suppression', message :'Voulez vous vraiment supprimer cette Zone ' };
  info : any = {title : 'Suppression', message :'Voulez vous supprimer ce client ' };

  closeResult: string;


  // DataTable Content Titles
  columns = [
    { name: 'quartier', sortable: true },
      { name: 'chef_zone', sortable: true },
      { name: 'nb_partisans', sortable: true },
      { name: 'couvert', sortable: true },
      { name: 'event', sortable: true },
      { name: 'statut', sortable: true },
      { name: 'Actions', sortable: false }
  ];
  submitted :any;
  zoneForm: FormGroup;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('popup') popup: ElementRef;
  @ViewChild('btnElement') btnElement: ElementRef;

  constructor(private router:Router,
     private zoneService:ZoneService,
     private modalService: NgbModal) {
       this.temp = [...data];
       this.rows = data;
       setTimeout(() => { this.loadingIndicator = false; }, 1500);
     }

   ngOnInit() {
     this.zoneForm = new FormGroup({
       chef_zone: new FormControl('',[Validators.required]),
       quartier: new FormControl('',[Validators.required]),
       nb_partisans: new FormControl(''),
       couvert: new FormControl('oui'),
       event: new FormControl(''),
       statut: new FormControl('')
     });
     setTimeout(() => {
       this.zoneService.getZones().subscribe(
         posts => {
           data = posts;
           this.temp = posts;
           this.zones = posts;
           this.rows = posts;
           this.filteredData = data;
         }
       );
     });
   }

   updateFilter(event) {
       const val = event.target.value.toLowerCase();
       // console.log("search")

       let keys = ['chef_zone','quartier','nb_partisans'];
       let colsCount = this.columns.length; // count the number of columns
       // filter our data
        this.rows = this.temp.filter(function (item) {
         for(let i=0; i <= colsCount; i++){
           var elementStr = item[keys[i]];
           if(typeof(elementStr)  === 'number'){
             elementStr = String(item[keys[i]]);
           }
           if((elementStr && elementStr.toLowerCase().indexOf(val) !== -1) || !val){
               return true ;
           }
         }
       });

       // Whenever the filter changes, always go back to the first page
       this.table.offset = 0;
   }
   loadZones(){
     this.zoneService.getZones().subscribe(
       posts => {
         data = posts;
         this.temp = posts;
         this.zones = posts;
         this.rows = posts;
         this.filteredData = data;
       }
     );
   }

   // ***** modal box management *****///
   open(infoElement,content,zone=null) {
   if(!zone){
     zone = {"chef_zone":"", "nb_partisans": 0, "couvert":"oui", "event" : 0, "statut":0, "quartier" : ""};
   }
   infoElement && infoElement.parentElement && infoElement.parentElement.parentElement &&
          infoElement.parentElement.parentElement.blur();
       this.zone = zone;
       this.modalService.open(content,{ windowClass: 'myCustomModalClass'}).result.then((result) => {
           this.closeResult = `Closed with: ${result}`;
       }, (reason) => {
           this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
       });
   }
   // open delete confirm modal
   openDelete(btnElement, content, zone) {
   //  btnElement
   // to correct Error: ExpressionChangedAfterItHasBeenCheckedError:
   btnElement && btnElement.parentElement && btnElement.parentElement.parentElement &&
          btnElement.parentElement.parentElement.blur();
       this.zone = zone;
       this.modalReference = this.modalService.open(content, {
           keyboard: false,
           backdrop: 'static'
         }).result.then((result) => {
             this.closeResult = `Closed with: ${result}`;
         }, (reason) => {
             this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
         });

   }

   // This function is used in open
   private getDismissReason(reason: any): string {
       if (reason === ModalDismissReasons.ESC) {
           return 'by pressing ESC';
       } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
           return 'by clicking on a backdrop';
       } else {
           return `with: ${reason}`;
       }
   }
   public openPopup(btnElement,head,body) {
   //  btnElement
   // to correct Error: ExpressionChangedAfterItHasBeenCheckedError:
   this.info.title = head;
   this.info.message = body;
   btnElement && btnElement.parentElement && btnElement.parentElement.parentElement &&
          btnElement.parentElement.parentElement.blur();
       // this.zone = zone;
       this.modalReference = this.modalService.open(this.popup, {
           keyboard: false,
           backdrop: 'static'
         }).result.then((result) => {
             this.closeResult = `Closed with: ${result}`;
         }, (reason) => {
             this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
         });
         setTimeout(() => {
           let closepop = document.getElementById('btnPopClose');
           closepop.click();
         },3500);

   }

   deleteZone(){
     this.zoneService.deleteZone(this.zone).subscribe(
       posts => {
         let delid = this.zone.id;
         this.loadZones();
         this.resetForm();
         let close = document.getElementById('closed');
         close.click();
         this.openPopup(this.btnElement,"Suppression De Zone","Suppression Bien Effectuée");
       }
     );

   }
   public createZone(){

     this.submitted = true;
     if(this.zone.id){
       this.editZone();
     }else{
       // stop here if form is invalid
       if (this.zoneForm.invalid) {
           return;
         }else{
           // this.staticAlertClosed = false;
           let sendZone = {
              "quartier": this.zoneForm.value.quartier,
              "chef_zone": this.zoneForm.value.chef_zone,
              "couvert": this.zoneForm.value.couvert
            };
           this.zoneService.createZone(sendZone).subscribe(
           (success) =>{
             // this.resetForm();
             this.loadZones();
             let close = document.getElementById('closeform');
             close.click();
             this.openPopup(this.btnElement,"Creation De Zone","Enregistrement Bien Effectué");

           },
           (error) => alert(error)
         );
       }
     }
   }
   public editZone(){
     if (!this.zone.id || this.zone === null) {
       return;
     }else{
       let sendZone : any =  new Object() ;
        if(this.zone.id) sendZone.id = this.zone.id;
        if(this.zoneForm.value.quartier) sendZone.quartier = this.zoneForm.value.quartier;
        if(this.zoneForm.value.chef_zone) sendZone.chef_zone = this.zoneForm.value.chef_zone;
        if(this.zoneForm.value.couvert) sendZone.couvert = this.zoneForm.value.couvert;
       this.zoneService.updateZone(sendZone).subscribe(
         (success) =>{
           // this.resetForm();
           this.loadZones();
           let close = document.getElementById('closeform');
           close.click();
           this.openPopup(this.btnElement,"Modication De Zone","Modification Bien Effectuée");
         },
         (error) => alert(error)
       );
     }
   }

   public resetForm(){
     this.zoneForm.reset();
     this.submitted = false;
     this.zone =  {"chef_zone":null, "nb_partisans": null, "couvert":"oui", "event" : 0, "statut":0, "quartier" : null};
   }

}
