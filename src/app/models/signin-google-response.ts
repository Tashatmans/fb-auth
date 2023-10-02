export class SigninGoogleResponse {
    constructor(
    public federatedId:string, // "federatedId": "https://accounts.google.com/1234567890",
    public providerId:string, // "providerId": "google.com",
    public localId:string, // "localId": "5xwsPCWYo...",
    public emailVerified:string, // "emailVerified": true,
    public email:string, // "email": "user@example.com",
    public oauthIdToken:string, // "oauthIdToken": "[GOOGLE_ID_TOKEN]",
    public firstName:string, // "firstName": "John",
    public lastName:string, // "lastName": "Doe",
    public fullName:string, // "fullName": "John Doe",
    public displayName:string, // "displayName": "John Doe",
    public idToken:string, // "idToken": "[ID_TOKEN]",
    public photoUrl:string, // "photoUrl": "https://lh5.googleusercontent.com/.../photo.jpg",
    public refreshToken:string, // "refreshToken": "[REFRESH_TOKEN]",
    public expiresIn:string, // "expiresIn": "3600",
    public rawUserInfo:string// "rawUserInfo": "{\"updated_time\":\"2017-02-22T01:10:57+0000\",\"gender\":\"male\", ...}"
    ){}
}
