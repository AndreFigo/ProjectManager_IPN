import { Injectable } from '@angular/core';
import { Project } from '../shared/Project';
import { ProjectTask } from '../shared/Task';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { LoginRequest, LoginResults } from '../shared/LoginResults';
import { map, tap, catchError } from "rxjs/operators"
import { Observable, throwError } from 'rxjs';
import { ProjectWorker } from '../shared/Worker';
import { RegisterResults } from '../shared/RegisterResults';
import { Router } from '@angular/router';



@Injectable()
export class StorageService {
  
  public baseUrl: string ="";
  public username: string="";
  public projectId: number=0;
  public workerName: string ="";
  public task: ProjectTask = new ProjectTask();
  public project: Project = new Project();
  public worker: ProjectWorker = new ProjectWorker();
  public role:string="";
  public token = "";
  public expiration = new Date();
  public projectToEdit: Project = new Project();
  
  constructor(private http: HttpClient, private router : Router) {
    this.baseUrl="http://localhost:8888"
  }
  
  get RequiresLogin(): boolean {
    return this.token.length === 0 || this.expiration < new Date();
  }
  
  login(credentials: LoginRequest){
    this.username= credentials.username;
    return this.http.post<LoginResults>(this.baseUrl+"/Account/CreateToken", credentials).pipe(map(data => {
      this.token = data.token;
      this.expiration = data.expiration;
      this.role= data.role;
    }));
  }
  
  register(regInfo: RegisterResults){
    return this.http.post<LoginResults>(this.baseUrl+"/Account/Register", regInfo).pipe(map(data => {
      this.token = data.token;
      this.expiration = data.expiration;
      this.role= data.role;
    })); 
  }
  
  logout(){
    alert("You've been logged out.")
    this.token="";
    this.expiration= new Date();
    this.role="";
    this.router.navigate(["/home"])
  }
  
  loadProjects(): Observable<Project[]>{
    //console.log(this.token)
    
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.token}`);
    return this.http.get<Project[]>(this.baseUrl+"/projects",{headers: headers})
    .pipe(
      tap(
        //data => console.log('All: ', JSON.stringify(data))
        ),
      catchError(this.handleError)
      );
    }

    loadProject(pId: number): Observable<Project>{
      //console.log(this.token)
      
      const headers = new HttpHeaders().set("Authorization", `Bearer ${this.token}`);
      return this.http.get<Project>(this.baseUrl+"/projects/"+pId,{headers: headers})
      .pipe(
        tap(
          //data => console.log('All: ', JSON.stringify(data))
          ),
        catchError(this.handleError)
        );
      }
    
    loadTasks(): Observable<ProjectTask[]>{
      //console.log(this.token)
      
      const headers = new HttpHeaders().set("Authorization", `Bearer ${this.token}`);
      return this.http.get<ProjectTask[]>(this.baseUrl+"/tasks",{headers: headers})
      .pipe(
        tap(
          //data => console.log('All: ', JSON.stringify(data))
          ),
        catchError(this.handleError)
        );
    }
    
    saveTasks(tasks: ProjectTask[]): Observable<void>{
      const headers = new HttpHeaders().set("Authorization", `Bearer ${this.token}`);
      return this.http.put(this.baseUrl+"/tasks",tasks, {headers: headers}).pipe(map(data => {
        alert(data);
      }));
    }
      
    loadWorkerInfo(username: string): Observable<ProjectWorker>{
      const headers = new HttpHeaders().set("Authorization", `Bearer ${this.token}`);
      return this.http.get<ProjectWorker>(this.baseUrl+ "/worker/get-"+username,{headers: headers})
      .pipe(
        tap(
          //data => console.log('All: ', JSON.stringify(data))
          ),
        catchError(this.handleError)
        );
    }

    getAllProgrammers() {
      const headers = new HttpHeaders().set("Authorization", `Bearer ${this.token}`);
      return this.http.get<ProjectWorker[]>(this.baseUrl+ "/worker/programmers",{headers: headers})
      .pipe(
        tap(
          //data => console.log('All: ', JSON.stringify(data))
          ),
        catchError(this.handleError)
      );
    }

    addProject(proj: Project): Observable<void>{
      console.log(proj)
      const headers = new HttpHeaders().set("Authorization", `Bearer ${this.token}`);
      return this.http.post(this.baseUrl+"/projects/add",proj, {headers: headers}).pipe(map(data => {
        console.log(data);
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
