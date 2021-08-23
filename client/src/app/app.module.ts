import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

import { AppComponent } from './app.component';
import { LoginPage } from './pages/login-page.component';
import { Register } from './pages/register.component';
import { Home } from './pages/home.component';
import router from './router';
import { HeaderComponent } from './shared/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { WorkPage } from './pages/work-page.component';
import { StorageService } from './services/storage.service';
import { AuthActivateService } from './services/AuthActivateService';
import { AuthActivatedService } from './services/auth-activated.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginPage,
    Register,
    Home,
    HeaderComponent,
    WorkPage
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
    AuthActivatedService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
