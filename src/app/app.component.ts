import { Component } from '@angular/core';
//import form group
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
//import service
import { ApiService } from './Services/api.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'PokeApp';
  lat : Number;
  lng : Number;
  zoom : Number;
  inputData : FormGroup;
  error : boolean;
  alert : string;
  showPoke : boolean;
  poke: any


  constructor( private formBuilder : FormBuilder, private ApiService : ApiService ){
    //set default data
    this.error = false,
    this.alert ="",
    this.showPoke = false,
    this.zoom = 17,
    this.poke = { name: "", avatar: "", latitude: -31.64626716864273, longitude: -60.70915170298816 },
    
    this.inputData = this.formBuilder.group({ PokeName:['', Validators.required] })
  }

  
  ngOnInit(){ this.geoLocalization() }

  //validate input form and get poke
  handleSubmit(){
    if( this.inputData.invalid ){
      this.error = true
      this.alert = 'Hey! Debes agregar un Pokemon!'
      return;
    }
    this.error = false;
    
    this.getPokemon();
  }

  //user geolocalization at init
  geoLocalization(){
    navigator.geolocation.getCurrentPosition( position =>{
      this.lat = position.coords.latitude,
      this.lng = position.coords.longitude
    });
  }

  //get a individual poke  
  getPokemon(){
    this.showPoke = true
  
    //generate random coords in 200mts range
    let factorLtd : Number = Math.random() * (31.646943044861487  - 31.6475732493562) + 31.6475732493562
    let factorLgtd : Number = Math.random()* (60.71173152402304  - 60.708446282053735) + 60.708446282053735
    
    const pokemon: string = this.inputData.value.PokeName

    this.ApiService.getPokemon(pokemon.toLocaleLowerCase().trim())
      .then(data => {

        if(data){
          this.poke.name = data.name,
          this.poke.avatar = data.sprites.front_default,
          this.poke.latitude = -factorLtd,
          this.poke.longitude = -factorLgtd
        }else{
          this.showPoke = false,
          this.error = true,
          this.alert = 'Ese Pokemon no existe!'
        }
      
      })
    //reset form
    this.inputData.setValue({PokeName: ""})                 
  }

}
