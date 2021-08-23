import { ProjectTask } from "./Task";

export interface Project {
    name: string;
    budget: number;
    managerUserName: string;
    tasks: ProjectTask[];
}