import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';


import { Router,RouterModule, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NgForm, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { SondageService } from "../../webservices/sondage.service"

@Component({
  selector: 'app-sondageform',
  templateUrl: './sondageform.component.html',
  styleUrls: ['./sondageform.component.scss'],
  providers : [SondageService]
})
export class SondageformComponent implements OnInit {
  sondageForm: FormGroup;
  isYourCandidat : string;
  qcandidat = true;
  qvote  = false;
  qcarte  = false;
  qfort  = false;
  qtopic = false;
  qcontre = false;
  // pointfort
  dynamique = false;
  genereux = false;
  rigoureux = false;
  homme_de_terrain  = false;
  reactif = false;

  // axeamelioration
  ameprox = false;
  amecamp = false;
  amejeun = false;
  amesoci = false;
  ameacce = false;

  // topic
  criminalite = false;
  transport = false;
  education = false;
  securite = false;
  corruption = false;

  // contre
  nabobo = false;
  nterrain = false;
  ngestion = false;
  cposte = false;
  pcompten = false;

  sondage : any = [];
  pointfort : any = [];
  axeamelioration : any = [];
  topic : any = [];
  contre : any = [];
  constructor(private sondageService:SondageService) { }

  ngOnInit() {
    this.sondageForm = new FormGroup({
      chef_zone: new FormControl('',[Validators.required]),
      quartier: new FormControl('',[Validators.required]),
      nb_partisans: new FormControl(''),
      couvert: new FormControl('oui'),
      event: new FormControl(''),
      statut: new FormControl('')
    });
  }

  isYourCandidatReponse(){
    this.qcandidat = false;
    let self = this;
    this.sondage.push({"code":1, "name":"pour"});
    // this.sondage.push({"code":2, "name":"carte"});
    setTimeout(function(){
      // self.qvote = true;
      self.qfort = true;
      self.qtopic = true;
    },1500);
  }
  isNotYourCandidatReponse(){
    this.qcandidat = false;
    let self = this;
    this.sondage.push({"code":3, "name":"contre"});
    // this.sondage.push({"code":2, "name":"carte"});
    setTimeout(function(){
      // self.qvote = true;
      self.qcontre = true;
      self.qtopic = true;
    },1500);
  }
  valider(){
    console.log(this.dynamique);
    // managing pointfort
    if(this.dynamique)  this.pointfort.push({"code":1, "name":"dynamique"})
    if(this.genereux)  this.pointfort.push({"code":2, "name":"genereux"})
    if(this.rigoureux)  this.pointfort.push({"code":3, "name":"rigoureux"})
    if(this.homme_de_terrain)   this.pointfort.push({"code":4, "name":"homme de terrain"})
    if(this.reactif)  this.pointfort.push({"code":5, "name":"reactif"})

    // managing axeamelioration
    if(this.ameprox)  this.axeamelioration.push({"code":1, "name":"Amélioration de sa proximité"})
    if(this.amecamp)  this.axeamelioration.push({"code":2, "name":"Amélioration son programme de campagne"})
    if(this.amejeun)  this.axeamelioration.push({"code":3, "name":"Faire des actions pour la jeunesse"})
    if(this.amesoci)   this.axeamelioration.push({"code":4, "name":"Plus d'implication dans les problèmes sociaux"})
    if(this.ameacce)  this.axeamelioration.push({"code":5, "name":"candidat difficile d'accès"})

    // managing topic
    if(this.criminalite)  this.topic.push({"code":1, "name":"criminalite"})
    if(this.amecamp)  this.topic.push({"code":2, "name":"transport"})
    if(this.amejeun)  this.topic.push({"code":3, "name":"education"})
    if(this.amesoci)   this.topic.push({"code":4, "name":"securite"})
    if(this.ameacce)  this.topic.push({"code":5, "name":"corruption"})

    // managing contre
    if(this.nabobo)  this.contre.push({"code":1, "name":"Non natif d'abobo"})
    if(this.nterrain)  this.contre.push({"code":2, "name":"Méconnaissance du terrain"})
    if(this.ngestion)  this.contre.push({"code":3, "name":"Mauvaise gestion"})
    if(this.cposte)   this.contre.push({"code":4, "name":"cumul de poste"})
    if(this.pcompten)  this.contre.push({"code":5, "name":"Pas compétent"})


    let res = {"sondage":this.sondage ,"pointfort":this.pointfort, "topic":this.topic, "axeamelioration":this.axeamelioration, "contre":this.contre};

    this.sondageService.createSondage(res).subscribe(
    (success) =>{
        console.log(res);
        this.resetSondage();
        console.log(success);
        alert("Sondage  ENREGISTRÉ");
      },
      (error) => alert(error)
    );

    // console.log(res);
  }

  public resetSondage(){
    this.qcandidat = true;
    this.qvote  = false;
    this.qcarte  = false;
    this.qfort  = false;
    this.qtopic = false;
    this.qcontre = false;
    // pointfort
    this.dynamique = false;
    this.genereux = false;
    this.rigoureux = false;
    this.homme_de_terrain  = false;
    this.reactif = false;

    // axeamelioration
    this.ameprox = false;
    this.amecamp = false;
    this.amejeun = false;
    this.amesoci = false;
    this.ameacce = false;

    // topic
    this.criminalite = false;
    this.transport = false;
    this.education = false;
    this.securite = false;
    this.corruption = false;

    this.nabobo = false;
    this.nterrain = false;
    this.ngestion = false;
    this.cposte = false;
    this.pcompten = false;

    this.sondage = [];
    this.pointfort = [];
    this.axeamelioration = [];
    this.topic = [];
    this.contre = [];
  }

}
