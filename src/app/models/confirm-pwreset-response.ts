export class ConfirmPwresetResponse {
    constructor(
      public email:string, // "email": "[user@example.com]",
      public requestType:string // "requestType": "PASSWORD_RESET"
    ){}
}
