export class FetchEmailResponse {
constructor(
    public allProviders:string[], // "allProviders": ["password", "google.com"],
    public registered:boolean // "registered": true
){}

}
