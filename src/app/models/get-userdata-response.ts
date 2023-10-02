import { User } from "./user";

export class GetUserdataResponse {
    constructor(
        public users:User[]
    ){}
}
