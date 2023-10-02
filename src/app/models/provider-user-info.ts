export class providerUserInfo {
    constructor(
        public providerId: string, // "providerId": "password",
        public displayName: string, // "displayName": "John Doe",
        public photoUrl: string, // "photoUrl": "http://localhost:8080/img1234567890/photo.png",
        public federatedId: string, // "federatedId": "user@example.com",
        public email: string, // "email": "user@example.com",
        public rawId: string, // "rawId": "user@example.com",
        public screenName: string, // "screenName": "user@example.com"
    ) { }
}
