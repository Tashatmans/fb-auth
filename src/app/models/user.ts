import { providerUserInfo } from "./provider-user-info"


export class User {
    constructor(
        public localId: string, // "localId": "ZY1rJK0...",
        public email: string, // "email": "user@example.com",
        private _token?: string,
        private _tokenExpirationDate?: Date,
        public emailVerified?: boolean, // "emailVerified": false,
        public displayName?: string, // "displayName": "John Doe",
        public providerUserInfo?: providerUserInfo[],
        public photoUrl?: string, // "photoUrl": "https://lh5.googleusercontent.com/.../photo.jpg",
        public passwordHash?: string, // "passwordHash": "...",
        public passwordUpdatedAt?: string, // "passwordUpdatedAt": 1.484124177E12,
        public validSince?: string, // "validSince": "1484124177",
        public disabled?: boolean, // "disabled": false,
        public lastLoginAt?: string, // "lastLoginAt": "1484628946000",
        public createdAt?: string, // "createdAt": "1484124142000",
        public customAuth?: boolean, // "customAuth": false

    ) { }

    get token() {
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            return null
        }
        return this._token
    }
}