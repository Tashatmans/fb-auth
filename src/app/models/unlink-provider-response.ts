import { providerUserInfo } from "./provider-user-info"

export class UnlinkProviderResponse {

    constructor(
        public localId: string, //  "tRcfmLH7o2...", 
        public email: string, //  "email": "[user@example2.com]",
        public displayName: string, // "displayName": "John Doe",
        public photoUrl: string, // "photoUrl": "https://lh5.googleusercontent.com/.../photo.jpg",
        public passwordHash: string, //  "passwordHash": "...",
        public providerUserInfo: providerUserInfo[],
        public emailVerified: boolean, // "emailVerified": false

    ) { }

}