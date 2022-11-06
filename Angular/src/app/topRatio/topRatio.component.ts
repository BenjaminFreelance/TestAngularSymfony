import {Component} from '@angular/core';
import {Movie} from "../entity/movie";
import {MoviesService} from "../service/movies.service";

@Component({
  selector: 'app-topRatio',
  templateUrl: './topRatio.component.html',
  styleUrls: ['./topRatio.component.css']
})
export class TopRatioComponent {
  public topRatio: Movie[] = [];

  constructor(public moviesService:MoviesService) {}

  ngOnInit(): void {
    this.moviesService.getTopRatio().subscribe((data: Movie[]) => {
      this.topRatio = data;
    });
  }
}
