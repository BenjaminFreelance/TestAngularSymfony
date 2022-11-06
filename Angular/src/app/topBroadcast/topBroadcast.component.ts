import {Component} from '@angular/core';
import {MoviesService} from "../service/movies.service";
import {Movie} from "../entity/movie";

@Component({
  selector: 'app-topBroadcast',
  templateUrl: './topBroadcast.component.html',
  styleUrls: ['./topBroadcast.component.css']
})
export class TopBroadcastComponent {
  public topBroadcast: Movie[] = [];

  constructor(public moviesService:MoviesService) {}

  ngOnInit(): void {
    this.moviesService.getTopBroadcast().subscribe((data: Movie[]) => {
      this.topBroadcast = data;
    });
  }

}
