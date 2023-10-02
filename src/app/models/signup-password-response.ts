export class SignupPasswordResponse {
    constructor(
        public idToken: string, //"[ID_TOKEN]"
        public email: string, // "[user@example.com]"
        public refreshToken: string, // "[REFRESH_TOKEN]"
        public expiresIn: string, // "3600"
        public localId: string // "tRcfmLH7..."
    ) { }
}
