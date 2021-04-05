import { Injectable } from '@angular/core';
import { Apollo,gql } from 'apollo-angular'
import { BehaviorSubject } from 'rxjs';
import {take, tap} from 'rxjs/operators'
import { Episode, Character, DataResponse } from '../interfaces/data.interfaces';
import { LocalStorageService } from './localstorage.service';

//Definir  el query  de GraphQl  ,  se  puede  probar  en  
// https://rickandmortyapi.com/graphql
const QUERY = gql`
{
  episodes {
  results {
    name
    episode
  }
}
characters {
  results {
    id
    name
    status
    species
    gender
    image
  }
}
}`;

@Injectable({
  providedIn: 'root'
})
export class DataService {

//definir  los  BehaviorSubject  
private episodesSubject = new BehaviorSubject<Episode[]>(null);
// Es  un  observable
episodes$ = this.episodesSubject.asObservable();
private charactersSubject = new BehaviorSubject<Character[]>(null);
characters$ = this.charactersSubject.asObservable();

  constructor(private apollo: Apollo, private localStorageService: LocalStorageService ) {
    this.getDataApi();
  }

private getDataApi():void{
    this.apollo.watchQuery<DataResponse>({
      query:QUERY
    }).valueChanges.pipe(
      take(1),
      tap(resp =>{
        console.log(resp);
        // Desestructuración La  data  viene  [data: {episodes:{results[]} charactes:{results[]} }]
        // con  esto  logramos  construir  dos constantes tipo arreglo  del  tipo  Character[] y Episode[]
        const { data } = resp;
        const {characters, episodes} = data;
        this.episodesSubject.next(episodes.results);
        //this.charactersSubject.next(characters.results);
        this.parseCharactersData(characters.results);
      })
    ).subscribe();
  }

  
//  Se  utiliza  este  metodo  para  inicializar  la  propiedad  isFavorite 

private parseCharactersData(characters: Character[]): void{
  console.log('parseCharactersData0 ',  JSON.stringify(characters));
  const currentFavs = this.localStorageService.getFavoritesCharacters();
  const newData = characters.map(character => {
    const {id} = character;
    // coloca  el !! para  parsear la  const  a  boleana
    //  busca  cada  elemento  que  viene  del API  y  si  esta  en el  localStorage  le  colocara  isFavorite = true
    // de lo  contrario  le  colocara  isFavorite = false
    //  genera  un  nuevo  arreglo  con la  propiedad isFavorite
    const found = !!currentFavs.find((fav: Character) => fav.id === id);
    const salida = {...character, isFavorite: found};
    console.log('parseCharactersData1 ',  JSON.stringify(salida));
    return salida;
  });
  console.log('parseCharactersData2 ',  JSON.stringify(newData));
  // El Arreglo newData  es  el  que  se  enviara  a otros  componenetes
  this.charactersSubject.next(newData);
}


}
