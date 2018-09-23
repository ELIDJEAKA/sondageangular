import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DatatableComponent } from "@swimlane/ngx-datatable/release";
import { environment } from '../../environments/environment';


import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, RouterModule, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NgForm, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { ZoneService } from "../webservices/zone.service"
import { EventService } from "../webservices/event.service"

declare var require: any;
var data: any = require('../shared/data/company.json');
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
  providers: [ZoneService, EventService]
})
export class EventComponent implements OnInit {

  modalReference: any;
  rows = [];
  temp = [];
  filteredData = [];
  loadingIndicator: boolean = true;
  reorderable: boolean = true;

  events: any;
  zones: any;
  event: any = { "category": "reunion", "organisateur": "", "description": "", "date": 0, "nb_participant": 0, "statut": "non debuté", "zone": "" }; // the event seclected
  options: any = { title: 'Suppression', message: 'Voulez vous vraiment supprimer cet evenement ' };
  info: any = { title: 'Suppression', message: 'Voulez vous supprimer ce evenement ' };

  closeResult: string;


  // DataTable Content Titles
  columns = [
    { name: 'category', sortable: true },
    { name: 'organisateur', sortable: true },
    { name: 'description', sortable: true },
    { name: 'date', sortable: true },
    { name: 'nb_participant', sortable: true },
    { name: 'statut', sortable: true },
    { name: 'zone', sortable: true },
    { name: 'Actions', sortable: false }
  ];
  submitted: any;
  eventForm: FormGroup;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('popup') popup: ElementRef;
  @ViewChild('btnElement') btnElement: ElementRef;


  constructor(private router: Router,
    private zoneService: ZoneService,
    private eventService: EventService,
    private modalService: NgbModal) {
    this.temp = [...data];
    this.rows = data;
    setTimeout(() => { this.loadingIndicator = false; }, 1500);
  }

  ngOnInit() {
    this.eventForm = new FormGroup({
      category: new FormControl('reunion', [Validators.required]),
      organisateur: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      date: new FormControl(''),
      nb_participant: new FormControl(''),
      statut: new FormControl('non debuté'),
      zone: new FormControl('')
    });
    setTimeout(() => {
      this.eventService.getEvents().subscribe(
        posts => {
          console.log(posts)
          this.filteredData = data;
          data = posts;
          this.temp = posts;
          this.events = posts;
          this.rows = posts;
          this.getZones();
        }
      );
    });
  }

  updateFilter(profession) {
    const val = profession.target.value.toLowerCase();
    // console.log("search")

    let keys = ['category', 'organisateur', 'date'];
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
  loadEvents() {
    this.eventService.getEvents().subscribe(
      posts => {
        this.getZones();
        console.log(posts);
        data = posts;
        this.temp = posts;
        this.events = posts;
        this.rows = posts;
        this.filteredData = data;
      }
    );
  }

  // ***** modal box management *****///
  open(infoElement, content, event = null) {
    if (!event) {
      event = { "category": "reunion", "organisateur": "", "description": "", "profession": "", "statut": "membre simple", "lieu_residence": "", "email": "", "contact": "" };
    }
    infoElement && infoElement.parentElement && infoElement.parentElement.parentElement &&
      infoElement.parentElement.parentElement.blur();
    this.event = event;
    this.modalService.open(content, { windowClass: 'myCustomModalClass' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  // open delete confirm modal
  openDelete(btnElement, content, event) {
    //  btnElement
    // to correct Error: ExpressionChangedAfterItHasBeenCheckedError:
    btnElement && btnElement.parentElement && btnElement.parentElement.parentElement &&
      btnElement.parentElement.parentElement.blur();
    this.event = event;
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
    // this.event = event;
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

  deleteEvent() {
    this.eventService.deleteEvent(this.event).subscribe(
      posts => {
        let delid = this.event.id;
        this.loadEvents();
        this.resetForm();
        let close = document.getElementById('closed');
        close.click();
        this.openPopup(this.btnElement, "Suppression De Event", "Suppression Bien Effectuée");
      }
    );

  }
  public createEvent() {

    this.submitted = true;
    if (this.event.id) {
      this.editEvent();
    } else {
      // stop here if form is invalid
      if (this.eventForm.invalid) {
        return;
      } else {
        // this.staticAlertClosed = false;
        let sendEvent = {
          "category": this.eventForm.value.category,
          "organisateur": this.eventForm.value.organisateur,
          "description": this.eventForm.value.description,
          "date": this.eventForm.value.date,
          "nb_participant": this.eventForm.value.nb_participant,
          "statut": this.eventForm.value.statut,
          "zone": this.eventForm.value.zone
        };
        this.eventService.createEvent(sendEvent).subscribe(
          (success) => {
            // this.resetForm();
            this.loadEvents();
            let close = document.getElementById('closeform');
            close.click();
            this.openPopup(this.btnElement, "Creation De Event", "Enregistrement Bien Effectué");

          },
          (error) => alert(error)
        );
      }
    }
  }
  public editEvent() {
    if (!this.event.id || this.event === null) {
      return;
    } else {
      let sendEvent: any = new Object();
      if (this.event.id) sendEvent.id = this.event.id;
      if (this.eventForm.value.category) sendEvent.category = this.eventForm.value.category;
      if (this.eventForm.value.organisateur) sendEvent.organisateur = this.eventForm.value.organisateur;
      if (this.eventForm.value.description) sendEvent.description = this.eventForm.value.description;
      if (this.eventForm.value.date) sendEvent.date = this.eventForm.value.date;
      if (this.eventForm.value.nb_participant) sendEvent.nb_participant = this.eventForm.value.nb_participant;
      if (this.eventForm.value.statut) sendEvent.statut = this.eventForm.value.statut;
      if (this.eventForm.value.zone) sendEvent.zone = this.eventForm.value.zone;
      this.eventService.updateEvent(sendEvent).subscribe(
        (success) => {
          // this.resetForm();
          this.loadEvents();
          let close = document.getElementById('closeform');
          close.click();
          this.openPopup(this.btnElement, "Modication De Event", "Modification Bien Effectuée");
        },
        (error) => alert(error)
      );
    }
  }

  public resetForm() {
    this.eventForm.reset();
    this.submitted = false;
    this.event = { "category": null, "organisateur": null, "description": "", "date": 0, "nb_participant": 0, "statut": null };
  }
  public getZones() {
    this.zoneService.getZones().subscribe(
      posts => {
        this.zones = posts;
        // this.eventForm.zone.value = posts[0].id;
      }
    );
  }

}
