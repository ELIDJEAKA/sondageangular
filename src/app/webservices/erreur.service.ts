import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ErreurService {

    apiurl = environment.apiurl;

    constructor(private http:Http) { }
    getErreurs(){
      return this.http.get(this.apiurl+'erreur')
      .map(
        res => res.json()
      )
    }
    getErreurById(id){
      var url = this.apiurl+'erreur/'+id;

      return this.http
          .get(this.apiurl+'erreur/'+id).map((res:Response) => res.json());
    }

    createErreur(erreur:any){

      var body = JSON.stringify(erreur);
      var headerOptions = new Headers({'Content-Type':'application/json'});
      var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headerOptions});
      return this.http.post(this.apiurl+'erreur',body,requestOptions).map(x => x.json());
    }
    updateErreur(erreur:any){
      var body = JSON.stringify(erreur);
      var headerOptions = new Headers({'Content-Type':'application/json'});
      var requestOptions = new RequestOptions({headers : headerOptions});
      return this.http.patch(this.apiurl+'erreur/'+erreur.id,body,requestOptions).map(x => x.json());
    }
    deleteErreur(erreur){
        var body = JSON.stringify(erreur);
        var headerOptions = new Headers({'Content-Type':'application/json'});
        var requestOptions = new RequestOptions({method : RequestMethod.Delete,headers : headerOptions});
        return this.http.delete(this.apiurl+'erreur/'+erreur.id,requestOptions).map(x => x.json());
      }

}
