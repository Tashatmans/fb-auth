export class SigninPasswordResponse {
    constructor(
        public localId: string, //"ZY1rJK0eYLg...",
        public email: string, //"[user@example.com]",
        public displayName: string, // "displayName": "John Doe",
        public idToken: string, //"[ID_TOKEN]",
        public registered: string, //true,
        public refreshToken: string, // "[REFRESH_TOKEN]",
        public expiresIn: string // "3600"
       ){}
 }
 