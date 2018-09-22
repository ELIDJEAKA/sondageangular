import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class PartisanService {

  apiurl = environment.apiurl;

  constructor(private http:Http) { }
  getPartisans(){
    return this.http.get(this.apiurl+'partisan')
    .map(
      res => res.json()
    )
  }
  getPartisanById(id){
    var url = this.apiurl+'partisan/'+id;

    return this.http
        .get(this.apiurl+'partisan/'+id).map((res:Response) => res.json());
  }

  createPartisan(partisan:any){

    var body = JSON.stringify(partisan);
    var headerOptions = new Headers({'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headerOptions});
    return this.http.post(this.apiurl+'partisan',body,requestOptions).map(x => x.json());
  }
  updatePartisan(partisan:any){
    var body = JSON.stringify(partisan);
    var headerOptions = new Headers({'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({headers : headerOptions});
    return this.http.patch(this.apiurl+'partisan/'+partisan.id,body,requestOptions).map(x => x.json());
  }
  deletePartisan(partisan){
      var body = JSON.stringify(partisan);
      var headerOptions = new Headers({'Content-Type':'application/json'});
      var requestOptions = new RequestOptions({method : RequestMethod.Delete,headers : headerOptions});
      return this.http.delete(this.apiurl+'partisan/'+partisan.id,requestOptions).map(x => x.json());
    }

}
