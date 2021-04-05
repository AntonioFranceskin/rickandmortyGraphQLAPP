import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Character } from '@app/shared/interfaces/data.interfaces';
import { LocalStorageService } from '@app/shared/services/localstorage.service';

@Component({
  selector: 'app-characters-card',
  templateUrl: './characters-card.component.html',
  styleUrls: ['./characters-card.component.scss'],
  // Esta  pendiente  de  recargar  cuando  character  cambie 
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharactersCardComponent {
  //Recibe data del padre en  este  caso  un  objeto tipo Character
@Input() character: Character;

constructor(private localStorageService: LocalStorageService) {}


//Estos  dos  metodos  se  llaman desde  la Vista  character-card.html
// Cambia  de favorito  a  no favorito
toogleFavorite():void {
  const isFavorite = this.character.isFavorite;
  this.getIcon(isFavorite);
  this.character.isFavorite = !isFavorite;
  this.localStorageService.addOrRemoveFavorite(this.character);
}

getIcon(isFavorite: boolean): string {
 return isFavorite? 'heart-solid.svg' : 'heart.svg';
}

}
