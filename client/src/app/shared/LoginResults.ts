export class LoginResults {
    token: string = "";
    expiration: Date = new Date();
    role: string="";
}


export class LoginRequest {
    username: string = "";
    password: string = "";
}
