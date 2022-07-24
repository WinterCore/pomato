import {IOAuthProvider, IOAuthUserData} from "./common.ts";
import {CONFIG} from "../../config.ts";

const CONSENT_ENDPOINT = "https://accounts.google.com/o/oauth2/v2/auth";
const EXCHANGE_ENDPOINT = "https://oauth2.googleapis.com/token";
const USER_INFO_ENDPOINT = "https://www.googleapis.com/userinfo/v2/me";

const REDIRECT_URI = `${CONFIG.API_DOMAIN}/auth/google/callback`;

const SCOPES = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
];

interface IAccessTokenResp {
    readonly access_token: string;
    readonly expires_in: number;
    readonly scope: string;
    readonly id_token: string;
    readonly token_type: "Bearer";
}

export class GoogleAuth implements IOAuthProvider {
    getAuthURL(): string {
        const url = new URL(CONSENT_ENDPOINT);
        url.searchParams.set("client_id", CONFIG.GOOGLE_CLIENT_ID);
        url.searchParams.set("redirect_uri", REDIRECT_URI);
        url.searchParams.set("response_type", "code");
        url.searchParams.set("scope", SCOPES.join(" "));

        return url.toString();
    }


    /*
    getData(): Promise<IOAuthUserData> {
        
    }
    */

    async getAccessToken(authCode: string): Promise<string> {
        const url = new URL(EXCHANGE_ENDPOINT);
        url.searchParams.set("client_id", CONFIG.GOOGLE_CLIENT_ID);
        url.searchParams.set("client_secret", CONFIG.GOOGLE_CLIENT_SECRET);
        url.searchParams.set("redirect_uri", REDIRECT_URI);
        url.searchParams.set("grant_type", "authorization_code");
        url.searchParams.set("code", authCode);

        const resp = await fetch(url, { method: "POST" });
        const body = await resp.json()
        return "";
    }
}
