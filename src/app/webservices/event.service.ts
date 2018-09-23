import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class EventService {


    apiurl = environment.apiurl;

    constructor(private http:Http) { }
    getEvents(){
      return this.http.get(this.apiurl+'event')
      .map(
        res => res.json()
      )
    }
    getEventById(id){
      var url = this.apiurl+'event/'+id;

      return this.http
          .get(this.apiurl+'event/'+id).map((res:Response) => res.json());
    }

    createEvent(event:any){

      var body = JSON.stringify(event);
      var headerOptions = new Headers({'Content-Type':'application/json'});
      var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headerOptions});
      return this.http.post(this.apiurl+'event',body,requestOptions).map(x => x.json());
    }
    updateEvent(event:any){
      var body = JSON.stringify(event);
      var headerOptions = new Headers({'Content-Type':'application/json'});
      var requestOptions = new RequestOptions({headers : headerOptions});
      return this.http.patch(this.apiurl+'event/'+event.id,body,requestOptions).map(x => x.json());
    }
    deleteEvent(event){
        var body = JSON.stringify(event);
        var headerOptions = new Headers({'Content-Type':'application/json'});
        var requestOptions = new RequestOptions({method : RequestMethod.Delete,headers : headerOptions});
        return this.http.delete(this.apiurl+'event/'+event.id,requestOptions).map(x => x.json());
      }

}
