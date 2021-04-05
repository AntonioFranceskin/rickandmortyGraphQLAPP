import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Character } from '@app/shared/interfaces/data.interfaces';
const MY_FAVORITES = 'myfavorites';
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
    private charactersFavSubject = new BehaviorSubject<Character[]>(null);
    // Es  un  observable
    charactersFav$ = this.charactersFavSubject.asObservable();
    
constructor(){
    this.initialStorage();
    this.getFavoritesCharacters();
}

addOrRemoveFavorite(character: Character): void {
    const {id} = character;
    const currentsFav = this.getFavoritesCharacters();
    const found = !!currentsFav.find((fav: Character) => fav.id === id);
    found ? this.remoteFromFavotite(id) : this.addToFavotite(character);
}

private remoteFromFavotite(id: number):void {
    try {
        const currentsFav = this.getFavoritesCharacters();
        const characters = currentsFav.filter(item =>  item.id !== id);
        localStorage.setItem(MY_FAVORITES, JSON.stringify([...characters]));
        this.charactersFavSubject.next([...characters]);
    } catch (error) {
        console.log('Error removing  localStorage', error);
        alert('Error');
    }
}

private addToFavotite(character: Character):void {
    try {
        const currentFav = this.getFavoritesCharacters();
        localStorage.setItem(MY_FAVORITES, JSON.stringify([...currentFav, character]));
        this.charactersFavSubject.next([...currentFav, character]);
    } catch (error) {
        console.log('Error saving  localStorage', error);
        alert('Error');
    }
}


private initialStorage():void {
    const currents = JSON.parse(localStorage.getItem(MY_FAVORITES));
    if(!currents) {
        localStorage.setItem(MY_FAVORITES, JSON.stringify([]));
    }
}

getFavoritesCharacters(): any {
    try {
       const charactersFav =  JSON.parse(localStorage.getItem(MY_FAVORITES));
       this.charactersFavSubject.next(charactersFav);
       return  charactersFav;
    } catch (error) {
        console.log('Error getting favorites from localStorage', error);
    }
}
clearStorage():void {
    try {
        localStorage.clear();
    } catch (error) {
        console.log('Error clearing localStorage', error);
    }
}


}