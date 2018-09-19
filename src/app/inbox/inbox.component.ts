import { Component, OnInit, ElementRef } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {
  public isCollapsed = true;
  public isCollapsed1 = false;
  closeResult: string;
  constructor(private elRef: ElementRef, private modalService: NgbModal) {
  }

  ngOnInit() {
  	$.getScript('./assets/js/inbox.js');
  }

    //inbox user list click event function
    SetActive(event) {
      var hElement: HTMLElement = this.elRef.nativeElement;
      //now you can simply get your elements with their class name
      var allAnchors = hElement.querySelectorAll('.users-list-padding > a.list-group-item');
      //do something with selected elements
      [].forEach.call(allAnchors, function (item: HTMLElement) {
        item.setAttribute('class', 'list-group-item list-group-item-action no-border');
      });
      //set active class for selected item 
      event.currentTarget.setAttribute('class', 'list-group-item list-group-item-action bg-blue-grey bg-lighten-5 border-right-primary border-right-2');
  
    }

    //compose popup start
    open(content) {
      this.modalService.open(content, { size: 'lg' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
  
    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return  `with: ${reason}`;
      }
    }
    //compose popup ends

}
