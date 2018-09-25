import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router,RouterModule, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SimulateurService } from "../webservices/simulateur.service"

@Component({
  selector: 'app-simulateur',
  templateUrl: './simulateur.component.html',
  styleUrls: ['./simulateur.component.scss'],
  providers : [SimulateurService]
})
export class SimulateurComponent implements OnInit {

  constructor(private simulateurService:SimulateurService,
              private router:Router) {

               }

  ngOnInit() {
  }

  public vote(candidat , code){
    let name = "";
    // candidat code du candidat 1 : si hambak
    // code : code de l'erreur 1 si valide , 2 erreur de symbole
    /*{
    	"candidat":1,
    	"code":1,
    	"name":"Vote valide"
    }*/
    if(candidat == 1){
        if(code == 1){
          name = "Vote Valide";
        }else if(code == 2){  name  = "Erreur De Symbole";      }
    }else{
      name = "Erreur De Candidat";
    }

    let res = {	"candidat":candidat, 	"code":code, 	"name":name  };
    this.simulateurService.createSimulateur(res).subscribe(
    (success) =>{
      console.log(res);
      console.log(success);
      alert("VOTE ENREGISTRÉ");
    },
    (error) => alert(error)
  );

    console.log(candidat);
    console.log(code);

  }

}
