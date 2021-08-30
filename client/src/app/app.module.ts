import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

import { AppComponent } from './app.component';
import router from './router';
import { HeaderComponent } from './shared/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { StorageService } from './services/storage.service';
import { AuthActivateService } from './services/AuthActivateService';
import { AuthActivatedService } from './services/auth-activated.service';
import { AddProjectComponent } from './pages/add-project/add-project.component';
import { LoginPage } from './pages/login-page/login-page.component';
import { Register } from './pages/register/register.component';
import { Home } from './pages/home/home.component';
import { WorkPage } from './pages/work-page/work-page.component';
import { RoleAuthService } from './services/role-auth.service';
import { ProfileComponent } from './pages/profile/profile.component';
import { UserComponent } from './pages/user/user.component';
import { TaskComponent } from './pages/task/task.component';
import { ProjectComponent } from './pages/project/project.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPage,
    Register,
    Home,
    HeaderComponent,
    WorkPage,
    AddProjectComponent,
    ProfileComponent,
    UserComponent,
    TaskComponent,
    ProjectComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    router
  ],
  providers: [
    StorageService,
    AuthActivateService,
    AuthActivatedService,
    RoleAuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
