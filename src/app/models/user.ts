export class User {
    userId: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    isAdmin: boolean;
}

export class UpdateProfile {
    firstName: string;
    lastName: string;
}


export class CurrentUser {
    userId: string;
    firstName: string;
    lastName: string;
    isAdmin: boolean;
    access_token: string;
}
