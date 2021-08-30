export class ProjectTask {
    name: string="";
    description: string="";
    responsibleUserName: string="";
    projectIncludedInName: string="";
    projectIncludedInId: number=0;
    state: number=0;
    deadline: Date = new Date();
}