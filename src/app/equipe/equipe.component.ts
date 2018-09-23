import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DatatableComponent } from "@swimlane/ngx-datatable/release";
import { environment } from '../../environments/environment';


import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, RouterModule, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NgForm, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { ZoneService } from "../webservices/zone.service"
import { EquipeService } from "../webservices/equipe.service"

declare var require: any;
var data: any = require('../shared/data/company.json');
@Component({
  selector: 'app-equipe',
  templateUrl: './equipe.component.html',
  styleUrls: ['./equipe.component.scss'],
  providers: [ZoneService, EquipeService]
})
export class EquipeComponent implements OnInit {

  modalReference: any;
  rows = [];
  temp = [];
  filteredData = [];
  loadingIndicator: boolean = true;
  reorderable: boolean = true;

  equipes: any;
  zones: any;
  equipe: any = { "name": "", "membre": "", "fonction": "agent de terrain", "contact": "", "zone": "" }; // the equipe seclected
  options: any = { title: 'Suppression', message: 'Voulez vous vraiment supprimer cet evenement ' };
  info: any = { title: 'Suppression', message: 'Voulez vous supprimer ce evenement ' };

  closeResult: string;


  // DataTable Content Titles
  columns = [
    { name: 'name', sortable: true },
    { name: 'membre', sortable: true },
    { name: 'fonction', sortable: true },
    { name: 'contact', sortable: true },
    { name: 'zone', sortable: true },
    { name: 'Actions', sortable: false }
  ];
  submitted: any;
  equipeForm: FormGroup;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('popup') popup: ElementRef;
  @ViewChild('btnElement') btnElement: ElementRef;


  constructor(private router: Router,
    private zoneService: ZoneService,
    private equipeService: EquipeService,
    private modalService: NgbModal) {
    this.temp = [...data];
    this.rows = data;
    setTimeout(() => { this.loadingIndicator = false; }, 1500);
  }

  ngOnInit() {
    this.equipeForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      membre: new FormControl('', [Validators.required]),
      fonction: new FormControl('agent de terrain'),
      contact: new FormControl(''),
      zone: new FormControl('')
    });
    setTimeout(() => {
      this.equipeService.getEquipes().subscribe(
        posts => {
          console.log(posts)
          this.filteredData = data;
          data = posts;
          this.temp = posts;
          this.equipes = posts;
          this.rows = posts;
          this.getZones();
        }
      );
    });
  }

  updateFilter(profession) {
    const val = profession.target.value.toLowerCase();
    // console.log("search")

    let keys = ['name', 'membre', 'fonction'];
    let colsCount = this.columns.length; // count the number of columns
    // filter our data
    this.rows = this.temp.filter(function (item) {
      for (let i = 0; i <= colsCount; i++) {
        var elementStr = item[keys[i]];
        if (typeof (elementStr) === 'number') {
          elementStr = String(item[keys[i]]);
        }
        if ((elementStr && elementStr.toLowerCase().indexOf(val) !== -1) || !val) {
          return true;
        }
      }
    });

    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }
  loadEquipes() {
    this.equipeService.getEquipes().subscribe(
      posts => {
        this.getZones();
        console.log(posts);
        data = posts;
        this.temp = posts;
        this.equipes = posts;
        this.rows = posts;
        this.filteredData = data;
      }
    );
  }

  // ***** modal box management *****///
  open(infoElement, content, equipe = null) {
    if (!equipe) {
      equipe = { "name": "", "membre": "", "fonction": "", "contact": "", "zone": ""};
    }
    infoElement && infoElement.parentElement && infoElement.parentElement.parentElement &&
      infoElement.parentElement.parentElement.blur();
    this.equipe = equipe;
    this.modalService.open(content, { windowClass: 'myCustomModalClass' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  // open delete confirm modal
  openDelete(btnElement, content, equipe) {
    //  btnElement
    // to correct Error: ExpressionChangedAfterItHasBeenCheckedError:
    btnElement && btnElement.parentElement && btnElement.parentElement.parentElement &&
      btnElement.parentElement.parentElement.blur();
    this.equipe = equipe;
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
  public openPopup(btnElement, head, body) {
    //  btnElement
    // to correct Error: ExpressionChangedAfterItHasBeenCheckedError:
    this.info.title = head;
    this.info.message = body;
    btnElement && btnElement.parentElement && btnElement.parentElement.parentElement &&
      btnElement.parentElement.parentElement.blur();
    // this.equipe = equipe;
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
    }, 3500);

  }

  deleteEquipe() {
    this.equipeService.deleteEquipe(this.equipe).subscribe(
      posts => {
        let delid = this.equipe.id;
        this.loadEquipes();
        this.resetForm();
        let close = document.getElementById('closed');
        close.click();
        this.openPopup(this.btnElement, "Suppression De Equipe", "Suppression Bien Effectuée");
      }
    );

  }
  public createEquipe() {

    this.submitted = true;
    if (this.equipe.id) {
      this.editEquipe();
    } else {
      // stop here if form is invalid
      if (this.equipeForm.invalid) {
        return;
      } else {
        // this.staticAlertClosed = false;
        let sendEquipe = {
          "name": this.equipeForm.value.name,
          "membre": this.equipeForm.value.membre,
          "fonction": this.equipeForm.value.fonction,
          "contact": this.equipeForm.value.contact,
          "zone": this.equipeForm.value.zone
        };
        this.equipeService.createEquipe(sendEquipe).subscribe(
          (success) => {
            // this.resetForm();
            this.loadEquipes();
            let close = document.getElementById('closeform');
            close.click();
            this.openPopup(this.btnElement, "Creation De Equipe", "Enregistrement Bien Effectué");

          },
          (error) => alert(error)
        );
      }
    }
  }
  public editEquipe() {
    if (!this.equipe.id || this.equipe === null) {
      return;
    } else {
      let sendEquipe: any = new Object();
      if (this.equipe.id) sendEquipe.id = this.equipe.id;
      if (this.equipeForm.value.name) sendEquipe.name = this.equipeForm.value.name;
      if (this.equipeForm.value.membre) sendEquipe.membre = this.equipeForm.value.membre;
      if (this.equipeForm.value.fonction) sendEquipe.fonction = this.equipeForm.value.fonction;
      if (this.equipeForm.value.contact) sendEquipe.contact = this.equipeForm.value.contact;
      if (this.equipeForm.value.zone) sendEquipe.zone = this.equipeForm.value.zone;
      this.equipeService.updateEquipe(sendEquipe).subscribe(
        (success) => {
          // this.resetForm();
          this.loadEquipes();
          let close = document.getElementById('closeform');
          close.click();
          this.openPopup(this.btnElement, "Modication De Equipe", "Modification Bien Effectuée");
        },
        (error) => alert(error)
      );
    }
  }

  public resetForm() {
    this.equipeForm.reset();
    this.submitted = false;
    this.equipe = { "name": null, "membre": null, "fonction": "", "contact": ""};
  }
  public getZones() {
    this.zoneService.getZones().subscribe(
      posts => {
        this.zones = posts;
        // this.equipeForm.zone.value = posts[0].id;
      }
    );
  }

}
