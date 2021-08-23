export interface ProjectTask {
    name: string;
    description: string;
    responsibleUserName: string;
    projectIncludedInName: string;
    state: number;
    deadline: Date;
}