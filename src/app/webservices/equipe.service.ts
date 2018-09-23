import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class EquipeService {


    apiurl = environment.apiurl;

    constructor(private http:Http) { }
    getEquipes(){
      return this.http.get(this.apiurl+'equipe')
      .map(
        res => res.json()
      )
    }
    getEquipeById(id){
      var url = this.apiurl+'equipe/'+id;

      return this.http
          .get(this.apiurl+'equipe/'+id).map((res:Response) => res.json());
    }

    createEquipe(equipe:any){

      var body = JSON.stringify(equipe);
      var headerOptions = new Headers({'Content-Type':'application/json'});
      var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headerOptions});
      return this.http.post(this.apiurl+'equipe',body,requestOptions).map(x => x.json());
    }
    updateEquipe(equipe:any){
      var body = JSON.stringify(equipe);
      var headerOptions = new Headers({'Content-Type':'application/json'});
      var requestOptions = new RequestOptions({headers : headerOptions});
      return this.http.patch(this.apiurl+'equipe/'+equipe.id,body,requestOptions).map(x => x.json());
    }
    deleteEquipe(equipe){
        var body = JSON.stringify(equipe);
        var headerOptions = new Headers({'Content-Type':'application/json'});
        var requestOptions = new RequestOptions({method : RequestMethod.Delete,headers : headerOptions});
        return this.http.delete(this.apiurl+'equipe/'+equipe.id,requestOptions).map(x => x.json());
      }

}
