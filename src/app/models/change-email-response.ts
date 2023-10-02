import { providerUserInfo } from "./provider-user-info"

export class ChangeEmailResponse {

constructor(
    public localId:string, //  "tRcfmLH7o2...", 
    public email:string, //  "email": "[user@example2.com]",
    public passwordHash:string, //  "passwordHash": "...",
    public providerUserInfo:providerUserInfo[],
    public idToken:string, //  "[NEW_ID_TOKEN]",
    public refreshToken:string, //  "[NEW_REFRESH_TOKEN]",
    public expiresIn:string, // "3600"

){}

}
