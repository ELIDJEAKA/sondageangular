import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class SondageService {
  apiurl = environment.apiurl;



    constructor(private http:Http) { }
    getSondages(){
      return this.http.get(this.apiurl+'sondage')
      .map(
        res => res.json()
      )
    }
    getSondageByQuestion(question){
      var url = this.apiurl+'sondage/'+question;

      // return this.http
      //     .get(this.apiurl+'sondage/'+question).map((res:Response) => res.json());
      return this.http
          .get(this.apiurl+''+question).map((res:Response) => res.json());
    }

    createSondage(sondage:any){

      var body = JSON.stringify(sondage);
      var headerOptions = new Headers({'Content-Type':'application/json'});
      var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headerOptions});
      return this.http.post(this.apiurl+'sondage/add',body,requestOptions).map(x => x.json());
    }
    updateSondage(sondage:any){
      var body = JSON.stringify(sondage);
      var headerOptions = new Headers({'Content-Type':'application/json'});
      var requestOptions = new RequestOptions({headers : headerOptions});
      return this.http.patch(this.apiurl+'sondage/'+sondage.id,body,requestOptions).map(x => x.json());
    }
    deleteSondage(sondage){
        var body = JSON.stringify(sondage);
        var headerOptions = new Headers({'Content-Type':'application/json'});
        var requestOptions = new RequestOptions({method : RequestMethod.Delete,headers : headerOptions});
        return this.http.delete(this.apiurl+'sondage/'+sondage.id,requestOptions).map(x => x.json());
      }

}
