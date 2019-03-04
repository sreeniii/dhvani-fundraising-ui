export class User {
    userId: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    isAdmin: boolean;
    emailId: string;
    phoneNumber: string;
}

export class UpdateProfile {
    firstName: string;
    lastName: string;
    emailId: string;
    phoneNumber: string;
}


export class CurrentUser {
    userId: string;
    firstName: string;
    lastName: string;
    emailId: string;
    phoneNumber: string;
    isAdmin: boolean;
    access_token: string;
}
