class errors {
    public domain: string // "domain": "global",
    public reason: string // "reason": "invalid",
    public message: string // "message": "CREDENTIAL_TOO_OLD_LOGIN_AGAIN"
}

class error {
    public errors: errors[]
    public code: number // "code": 400,
    public message: string // "message": "CREDENTIAL_TOO_OLD_LOGIN_AGAIN"
}


export class ErrorResponse {
    constructor(
        public error: error
    ) { }

}
