import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class SimulateurService {
  apiurl = environment.apiurl;



    constructor(private http:Http) { }
    getSimulateurs(){
      return this.http.get(this.apiurl+'simulateur')
      .map(
        res => res.json()
      )
    }
    getSimulateurById(id){
      var url = this.apiurl+'simulateur/'+id;

      return this.http
          .get(this.apiurl+'simulateur/'+id).map((res:Response) => res.json());
    }

    createSimulateur(simulateur:any){

      var body = JSON.stringify(simulateur);
      var headerOptions = new Headers({'Content-Type':'application/json'});
      var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headerOptions});
      return this.http.post(this.apiurl+'simulateur/add',body,requestOptions).map(x => x.json());
    }
    updateSimulateur(simulateur:any){
      var body = JSON.stringify(simulateur);
      var headerOptions = new Headers({'Content-Type':'application/json'});
      var requestOptions = new RequestOptions({headers : headerOptions});
      return this.http.patch(this.apiurl+'simulateur/'+simulateur.id,body,requestOptions).map(x => x.json());
    }
    deleteSimulateur(simulateur){
        var body = JSON.stringify(simulateur);
        var headerOptions = new Headers({'Content-Type':'application/json'});
        var requestOptions = new RequestOptions({method : RequestMethod.Delete,headers : headerOptions});
        return this.http.delete(this.apiurl+'simulateur/'+simulateur.id,requestOptions).map(x => x.json());
      }
}
