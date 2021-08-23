import { Injectable } from '@angular/core';
import { Project } from '../shared/Project';
import { ProjectTask } from '../shared/Task';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { LoginRequest, LoginResults } from '../shared/LoginResults';
import { map, tap, catchError } from "rxjs/operators"
import { Observable, throwError } from 'rxjs';
import { ProjectWorker } from '../shared/Worker';



@Injectable()
export class StorageService {

  public baseUrl: string ="";
  public tasks: ProjectTask[] = [];
  public projects: Project[] = [];
  public worker: ProjectWorker = new ProjectWorker();
  public role:string="";
  public token = "";
  public expiration = new Date();

  constructor(private http: HttpClient) {
    this.baseUrl="http://localhost:8888"
   }

  get RequiresLogin(): boolean {
      return this.token.length === 0 || this.expiration < new Date();
  }

  login(credentials: LoginRequest){
    return this.http.post<LoginResults>(this.baseUrl+"/Account/CreateToken", credentials).pipe(map(data => {
        this.token = data.token;
        this.expiration = data.expiration;
        this.role= data.role;
    }));
  }

  logout(){
    this.token="";
    this.expiration= new Date();
    this.role="";
  }

  loadProjects(): Observable<Project[]>{
    console.log(this.token)

    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.token}`);
    return this.http.get<Project[]>(this.baseUrl+"/projects",{headers: headers})
            .pipe(
              tap(data => console.log('All: ', JSON.stringify(data))),
            catchError(this.handleError)
          );
  }

  loadTasks(): Observable<ProjectTask[]>{
    console.log(this.token)

    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.token}`);
    return this.http.get<ProjectTask[]>(this.baseUrl+"/tasks",{headers: headers})
            .pipe(
              tap(data => console.log('All: ', JSON.stringify(data))),
              catchError(this.handleError)
            );
  }

  saveTasks(tasks: ProjectTask[]): Observable<void>{
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.token}`);
    return this.http.post(this.baseUrl+"/tasks",tasks, {headers: headers}).pipe(map(data => {
      alert(data);
  }));
  }

  loadWorkerInfo(): Observable<void>{
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.token}`);
    return this.http.get<ProjectWorker>(this.baseUrl+ "/worker",{headers: headers})
    .pipe(map(
      data=>{
        this.worker= data;
        return;
      }));
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    //console.error(errorMessage);
    return throwError(errorMessage);
  }


}
