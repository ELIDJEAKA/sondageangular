import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DatatableComponent } from "@swimlane/ngx-datatable/release";
import { environment } from '../../environments/environment';


import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router,RouterModule, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NgForm, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { ZoneService } from "../webservices/zone.service"
import { PartisanService } from "../webservices/partisan.service"

declare var require: any;
var data: any = require('../shared/data/company.json');
@Component({
  selector: 'app-partisan',
  templateUrl: './partisan.component.html',
  styleUrls: ['./partisan.component.scss'],
  providers : [ZoneService,PartisanService]
})
export class PartisanComponent implements OnInit {

  modalReference: any;
  rows = [];
  temp = [];
  filteredData = [];
  loadingIndicator: boolean = true;
  reorderable: boolean = true;

  clients  : any;
  partisans  : any;
  zones  : any;
  partisan : any = {"fullname":"", "datenaiss": 0, "sexe":"M", "profession" : "", "lieu_residence" : "","contact":"","email":"","cni":"","carte_electeur":false,"num_carte_electeur":"","lieu_vote":"","avatar":"", "statut":"", "zone":""}; // the partisan seclected
  options : any = {title : 'Suppression', message :'Voulez vous vraiment supprimer ce Partisan ' };
  info : any = {title : 'Suppression', message :'Voulez vous supprimer ce client ' };

  closeResult: string;


  // DataTable Content Titles
  columns = [
    { name: 'lieu_residence', sortable: true },
      { name: 'fullname', sortable: true },
      { name: 'datenaiss', sortable: true },
      { name: 'sexe', sortable: true },
      { name: 'profession', sortable: true },
      { name: 'statut', sortable: true },
      { name: 'Actions', sortable: false }
  ];
  submitted :any;
  partisanForm: FormGroup;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('popup') popup: ElementRef;
  @ViewChild('btnElement') btnElement: ElementRef;


  constructor(private router:Router,
     private zoneService:ZoneService,
     private partisanService:PartisanService,
     private modalService: NgbModal) {
       this.temp = [...data];
       this.rows = data;
       setTimeout(() => { this.loadingIndicator = false; }, 1500);
     }

   ngOnInit() {
     this.partisanForm = new FormGroup({
       fullname: new FormControl('',[Validators.required]),
       lieu_residence: new FormControl('',[Validators.required]),
       datenaiss: new FormControl(''),
       sexe: new FormControl('M'),
       profession: new FormControl(''),
       zone: new FormControl(''),
       email: new FormControl(''),
       contact: new FormControl(''),
       statut: new FormControl('membre simple')
     });
     setTimeout(() => {
       this.partisanService.getPartisans().subscribe(
         posts => {
           console.log(posts)
           this.filteredData = data;
           data = posts;
           this.temp = posts;
           this.partisans = posts;
           this.rows = posts;
           this.getZones();
         }
       );
     });
   }

   updateFilter(profession) {
       const val = profession.target.value.toLowerCase();
       // console.log("search")

       let keys = ['fullname','lieu_residence','datenaiss'];
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
   loadPartisans(){
     this.partisanService.getPartisans().subscribe(
       posts => {
         this.getZones();
         console.log(posts);
         data = posts;
         this.temp = posts;
         this.partisans = posts;
         this.rows = posts;
         this.filteredData = data;
       }
     );
   }

   // ***** modal box management *****///
   open(infoElement,content,partisan=null) {
   if(!partisan){
     partisan = {"fullname":"", "datenaiss": 0, "sexe":"M", "profession" : "", "statut":"membre simple", "lieu_residence" : "","email":"", "contact":""};
   }
   infoElement && infoElement.parentElement && infoElement.parentElement.parentElement &&
          infoElement.parentElement.parentElement.blur();
       this.partisan = partisan;
       this.modalService.open(content,{ windowClass: 'myCustomModalClass'}).result.then((result) => {
           this.closeResult = `Closed with: ${result}`;
       }, (reason) => {
           this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
       });
   }
   // open delete confirm modal
   openDelete(btnElement, content, partisan) {
   //  btnElement
   // to correct Error: ExpressionChangedAfterItHasBeenCheckedError:
   btnElement && btnElement.parentElement && btnElement.parentElement.parentElement &&
          btnElement.parentElement.parentElement.blur();
       this.partisan = partisan;
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
       // this.partisan = partisan;
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

   deletePartisan(){
     this.partisanService.deletePartisan(this.partisan).subscribe(
       posts => {
         let delid = this.partisan.id;
         this.loadPartisans();
         this.resetForm();
         let close = document.getElementById('closed');
         close.click();
         this.openPopup(this.btnElement,"Suppression De Partisan","Suppression Bien Effectuée");
       }
     );

   }
   public createPartisan(){

     this.submitted = true;
     if(this.partisan.id){
       this.editPartisan();
     }else{
       // stop here if form is invalid
       if (this.partisanForm.invalid) {
           return;
         }else{
           // this.staticAlertClosed = false;
           let sendPartisan = {
              "lieu_residence": this.partisanForm.value.lieu_residence,
              "fullname": this.partisanForm.value.fullname,
              "sexe": this.partisanForm.value.sexe,
              "zone": this.partisanForm.value.zone,
              "email": this.partisanForm.value.email,
              "contact": this.partisanForm.value.contact,
              "profession": this.partisanForm.value.profession
            };
           this.partisanService.createPartisan(sendPartisan).subscribe(
           (success) =>{
             // this.resetForm();
             this.loadPartisans();
             let close = document.getElementById('closeform');
             close.click();
             this.openPopup(this.btnElement,"Creation De Partisan","Enregistrement Bien Effectué");

           },
           (error) => alert(error)
         );
       }
     }
   }
   public editPartisan(){
     if (!this.partisan.id || this.partisan === null) {
       return;
     }else{
       let sendPartisan : any =  new Object() ;
        if(this.partisan.id) sendPartisan.id = this.partisan.id;
        if(this.partisanForm.value.lieu_residence) sendPartisan.lieu_residence = this.partisanForm.value.lieu_residence;
        if(this.partisanForm.value.fullname) sendPartisan.fullname = this.partisanForm.value.fullname;
        if(this.partisanForm.value.lieu_residence) sendPartisan.lieu_residence = this.partisanForm.value.lieu_residence;
        if(this.partisanForm.value.lieu_residence) sendPartisan.lieu_residence = this.partisanForm.value.lieu_residence;
        if(this.partisanForm.value.email) sendPartisan.email = this.partisanForm.value.email;
        if(this.partisanForm.value.contact) sendPartisan.contact = this.partisanForm.value.contact;
       this.partisanService.updatePartisan(sendPartisan).subscribe(
         (success) =>{
           // this.resetForm();
           this.loadPartisans();
           let close = document.getElementById('closeform');
           close.click();
           this.openPopup(this.btnElement,"Modication De Partisan","Modification Bien Effectuée");
         },
         (error) => alert(error)
       );
     }
   }

   public resetForm(){
     this.partisanForm.reset();
     this.submitted = false;
     this.partisan =  {"fullname":null, "datenaiss": null, "sexe":"M", "profession" : 0, "statut":0, "lieu_residence" : null};
   }
   public getZones(){
     this.zoneService.getZones().subscribe(
       posts => {
         this.zones = posts;
         // this.partisanForm.zone.value = posts[0].id;
       }
   );
 }

}
