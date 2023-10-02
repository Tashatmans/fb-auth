export class ExchangeRefreshTokenResponse {
    constructor(
        public expires_in:string, // "expires_in": "3600"
        public token_type:string, // "token_type": "Bearer"
        public refresh_token:string, // "refresh_token": "[REFRESH_TOKEN]"
        public id_token:string, //  "id_token": "[ID_TOKEN]"
        public user_id:string, // "user_id": "tRcfmLH7o2XrNELi..."
        public project_id:string // project_id": "1234567890"
    ){}
}