import {UserRecord} from "firebase-admin/auth";

declare module "h3" {
    interface H3EventContext {
        user?: UserRecord;
    }
}

export {};
