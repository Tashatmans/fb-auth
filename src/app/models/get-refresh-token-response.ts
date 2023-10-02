export class GetRefreshTokenResponse {
    constructor(
        public idToken:string, //"idToken": "[ID_TOKEN]",
        public refreshToken:string, //"refreshToken": "[REFRESH_TOKEN]"
        public expiresIn:string // "expiresIn": "3600"
    ){}
}
