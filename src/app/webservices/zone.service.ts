import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ZoneService {
  apiurl = environment.apiurl;

  constructor(private http:Http) { }
  getZones(){
    return this.http.get(this.apiurl+'zone')
    .map(
      res => res.json()
    )
  }
  getZoneById(id){
    var url = this.apiurl+'zone/'+id;

    return this.http
        .get(this.apiurl+'zone/'+id).map((res:Response) => res.json());
  }

  createZone(zone:any){

    var body = JSON.stringify(zone);
    var headerOptions = new Headers({'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headerOptions});
    return this.http.post(this.apiurl+'zone',body,requestOptions).map(x => x.json());
  }
  updateZone(zone:any){
    var body = JSON.stringify(zone);
    var headerOptions = new Headers({'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({headers : headerOptions});
    return this.http.patch(this.apiurl+'zone/'+zone.id,body,requestOptions).map(x => x.json());
  }
  deleteZone(zone){
      var body = JSON.stringify(zone);
      var headerOptions = new Headers({'Content-Type':'application/json'});
      var requestOptions = new RequestOptions({method : RequestMethod.Delete,headers : headerOptions});
      return this.http.delete(this.apiurl+'zone/'+zone.id,requestOptions).map(x => x.json());
    }
  }
