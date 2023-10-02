import { providerUserInfo } from "./provider-user-info"

export class LinkEmailpwResponse {

    constructor(
        public localId: string, //  "tRcfmLH7o2...", 
        public email: string, //  "email": "[user@example2.com]",
        public displayName: string, // "displayName": "John Doe",
        public photoUrl: string, // "photoUrl": "https://lh5.googleusercontent.com/.../photo.jpg",
        public passwordHash: string, //  "passwordHash": "...",
        public providerUserInfo: providerUserInfo[], 
        public idToken: string, //  "[NEW_ID_TOKEN]",
        public refreshToken: string, //  "[NEW_REFRESH_TOKEN]",
        public expiresIn: string, // "expiresIn": "3600",
        public emailVerified: boolean, // "emailVerified": false

    ) { }

}
