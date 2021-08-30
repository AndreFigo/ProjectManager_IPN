import { ProjectTask } from "./Task";

export class Project {
    id: number=0;
    name: string="";
    budget: number=0;
    managerUserName: string="";
    tasks: ProjectTask[]=[];
}