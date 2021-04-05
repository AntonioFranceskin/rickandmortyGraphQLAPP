import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '@app/shared/services/localstorage.service';
import { Character } from '../../../shared/interfaces/data.interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  characters$ = this.localStorageService.charactersFav$;
  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
  }

}
