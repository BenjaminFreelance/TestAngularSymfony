
import {HttpClient} from '@angular/common/http';
import {MatDialog} from "@angular/material/dialog";
import {TopBroadcastComponent} from "./topBroadcast/topBroadcast.component";
import {TopRatioComponent} from "./topRatio/topRatio.component";
import {TopAverageBroadcastComponent} from "./topAverageBroadcast/topAverageBroadcast.component";
import {MoviesService} from "./service/movies.service";
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Movie} from "./entity/movie";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  movies: Movie[] = [];
  nationalityList = null;

  displayedColumns: string[] = ['nom', 'realisateur', 'annee_production', 'nationalite', 'derniere_diffusion'];
  searchForm: FormGroup;
  movieName = '';
  directorName = '';
  nationality = '';
  topBroadcast: Object = [];
  topRatio: Object = [];
  topAverageBroadcast: Object = [];
  dataSource: MatTableDataSource<Movie>;
  language = 'fr';


  constructor(private http: HttpClient, private dialog: MatDialog, private moviesService: MoviesService, private translate: TranslateService) {
    translate.setDefaultLang(this.language);
    translate.use(this.language);
  }

  changeLanguage(): void {
    if (this.language === 'fr') {
      this.language = 'en';
    } else {
      this.language = 'fr';
    }

    this.translate.use(this.language);

  }

  @ViewChild(MatSort) sort: MatSort | undefined;


  ngOnInit() {
    this.moviesService.getAllMovies().subscribe(data => {
      this.movies = data;

      this.nationalityList = [...new Set(this.movies.map(item => item.nationalite))];

      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;

      this.searchFormInit();
    });
  }

  searchFormInit() {
    this.searchForm = new FormGroup({
      movieName: new FormControl('', Validators.pattern('^[a-zA-Z ]+$')),
      directorName: new FormControl('', Validators.pattern('^[a-zA-Z ]+$')),
      nationality: new FormControl('')
    });
  }

  topFiveMovies() {
    this.dialog.open(TopBroadcastComponent, {
      data: {
        broadcast: this.topBroadcast
      },
    });
  }

  topFiveRatio() {
    this.dialog.open(TopRatioComponent, {
      data: {
        ratio: this.topRatio
      },
    });
  }

  topFiveAverage() {
    this.dialog.open(TopAverageBroadcastComponent, {
      data: {
        average: this.topAverageBroadcast
      },
    });
  }

  applyFilter() {
    this.movieName = this.searchForm.get('movieName')?.value;
    this.directorName = this.searchForm.get('directorName')?.value;
    this.nationality = this.searchForm.get('nationality')?.value;

    let movies = this.movies.filter((movie) => {
      let movieName = movie.nom.toLowerCase();
      let directorName = movie.realisateur.toLowerCase();
      let nationality = movie.nationalite;

      if(!this.movieName &&
        !this.directorName &&
        !this.nationality
      ){
        return movie;
      }

      // @todo better way to handle "all" nationality
      if (!this.nationality) {
        if (movieName.includes(this.movieName.toLowerCase()) &&
          directorName.includes(this.directorName.toLowerCase())
        ) {
          return movie;
        }
      } else {
        if (movieName.includes(this.movieName.toLowerCase()) &&
          directorName.includes(this.directorName.toLowerCase()) &&
          nationality.includes(this.nationality)
        ) {
          return movie;
        }
      }

      return null;
    })

    this.dataSource = new MatTableDataSource(movies);
    this.dataSource.sort = this.sort;
  }

}
