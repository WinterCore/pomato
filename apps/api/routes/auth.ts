import {Router} from "oak/mod.ts";
import {GoogleAuth} from "../lib/auth/google.ts";

const googleAuthenticator = new GoogleAuth();
export const AuthRouter = new Router();

AuthRouter.get("/auth/google", (ctx) => {
    const url = googleAuthenticator.getAuthURL();
    ctx.response.body = { url };
});

AuthRouter.get("/auth/google/callback", async (ctx) => {
    const { search } = ctx.request.url;
    const query = new URLSearchParams(search);
    const code = query.get("code");

    if (! code) {
        ctx.response.status = 400;
        ctx.response.body = { error: "Missing auth code" };
        return;
    }


    await googleAuthenticator.getAccessToken(code);

    ctx.response.body = "wtf";
});

