import { RouterModule } from "@angular/router";
import { AddProjectComponent } from "../pages/add-project/add-project.component";
import { Home } from "../pages/home/home.component";
import { LoginPage } from "../pages/login-page/login-page.component";
import { ProfileComponent } from "../pages/profile/profile.component";
import { ProjectComponent } from "../pages/project/project.component";
import { Register } from "../pages/register/register.component";
import { TaskComponent } from "../pages/task/task.component";
import { UserComponent } from "../pages/user/user.component";
import { WorkPage } from "../pages/work-page/work-page.component";

import { AuthActivatedService } from "../services/auth-activated.service";
import { AuthActivateService } from "../services/AuthActivateService";
import { RoleAuthService } from "../services/role-auth.service";



const routes = [
    { path: "", component: Home },
    { path: "home", component: Home },
    { path: "work", component: WorkPage, canActivate:  [AuthActivateService] },
    { path: "work/addProj", component: AddProjectComponent , canActivate:  [RoleAuthService] },
    { path: "work/project/:id", component: ProjectComponent, canActivate:  [AuthActivateService] },
    { path: "work/task", component: TaskComponent, canActivate:  [AuthActivateService] },
    { path: "work/user/:username", component: UserComponent, canActivate:  [AuthActivateService] },

    //

    //, canActivate:  [AuthActivateService]
    { path: "profile", component: ProfileComponent, canActivate:  [AuthActivateService]},

  { path: "login", component: LoginPage, canActivate:  [AuthActivatedService]},
  { path: "register", component: Register , canActivate:  [AuthActivatedService]},
    { path :"**", redirectTo:"/"}

];

const router = RouterModule.forRoot(routes, {
    useHash: false 
});

export default router;
