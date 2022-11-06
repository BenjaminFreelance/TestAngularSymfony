import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Movie} from "../entity/movie";
import {map, Observable} from "rxjs";

@Injectable({providedIn: 'root'})

export class MoviesService {


  constructor(private http: HttpClient) {}

  public getAllMovies(): Observable<Movie[]>
  {
    const headers = new HttpHeaders().set('accept', 'application/json');

    // @ts-ignore
    return this.http.get('http://localhost:8000/api', {headers});
  }

  public getTopBroadcast()
  {
    return this.http.get('http://localhost:8000/api/topbroadcast');
  }

  public getTopRatio()
  {
    return this.http.get('http://localhost:8000/api/topratio');
  }

  public getTopAverageBroadcast()
  {
    return this.http.get('http://localhost:8000/api/topaverage');
  }
}
