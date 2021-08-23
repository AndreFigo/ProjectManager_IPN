import { RouterModule } from "@angular/router";
import { Home } from "../pages/home.component";
import { LoginPage } from "../pages/login-page.component";
import { Register } from "../pages/register.component";
import { WorkPage } from "../pages/work-page.component";
import { AuthActivatedService } from "../services/auth-activated.service";
import { AuthActivateService } from "../services/AuthActivateService";



const routes = [
    { path: "", component: Home },
    { path: "home", component: Home },
    { path: "work", component: WorkPage, canActivate:  [AuthActivateService] },
    //, canActivate:  [AuthActivateService]
  { path: "login", component: LoginPage, canActivate:  [AuthActivatedService]},
  { path: "register", component: Register, canActivate:  [AuthActivatedService] },
    { path :"**", redirectTo:"/"}

];

const router = RouterModule.forRoot(routes, {
    useHash: false 
});

export default router;
