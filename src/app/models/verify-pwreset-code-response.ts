export class VerifyPwresetCodeResponse {
    constructor(
        public email:string, // "[user@example.com]"
        public requestType:string //"PASSWORD_RESET"
    ){}
}
