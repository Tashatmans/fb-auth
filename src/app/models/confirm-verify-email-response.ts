import { providerUserInfo } from "./provider-user-info"

export class ConfirmVerifyEmailResponse {

    constructor(
        public localId: string, // "FhyStE...",
        public email: string, // "email": "user@example.com",
        public passwordHash: string, // "passwordHash": "...",
        public providerUserInfo: providerUserInfo[]

    ) { }
}
