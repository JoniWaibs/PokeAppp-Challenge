import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseURL: string;
  constructor( private HttpClient : HttpClient ) { this.baseURL = "https://pokeapi.co/api/v2" }

  // async getAllPokemons():Promise<any>{

  //   try {
  //     return  await this.HttpClient.get<any>(this.baseURL+'/pokemon/?offset=200&limit=200').toPromise()
  //   } catch (error) {
  //     console.log(error) 
  //   }
    
  // };


  async getPokemon( name: string ):Promise<any>{

    try {
      return await  this.HttpClient.get<any>(this.baseURL+`/pokemon/${name}`).toPromise()
    } catch (error) {
      console.log(error)
    }
    
  };
  
}



