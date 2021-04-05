import { Component } from '@angular/core';
import { DataService } from '@app/shared/services/data.service';


@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.scss']
})
export class EpisodesComponent  {
  episodes$ = this.dataService.episodes$;
  constructor(private dataService: DataService) { }


}
