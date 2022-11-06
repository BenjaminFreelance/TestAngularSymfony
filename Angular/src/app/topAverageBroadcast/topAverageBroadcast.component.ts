import {Component} from '@angular/core';
import {Movie} from "../entity/movie";
import {MoviesService} from "../service/movies.service";

@Component({
  selector: 'app-topAverageBroadcast',
  templateUrl: './topAverageBroadcast.component.html',
  styleUrls: ['./topAverageBroadcast.component.css']
})
export class TopAverageBroadcastComponent {
  public topAverageBroadcast: Array<Movie|any> = [];

  constructor(public moviesService:MoviesService) {}

  ngOnInit(): void {
    this.moviesService.getTopAverageBroadcast().subscribe((data: Movie[]) => {
      this.topAverageBroadcast = data;
    });
  }

}
