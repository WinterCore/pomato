import {verify} from "djwt/mod.ts";
import {Middleware} from "oak/middleware.ts";
import {CONFIG} from "../config.ts";

export interface IAuthState {
    readonly userID: string;
}

export const authenticated: Middleware = async (ctx, next) => {
    const authHeader = ctx.request.headers.get("Authorization");

    if (! authHeader) {
        ctx.response.status = 401;
        return;
    }

    const token = authHeader.slice("Bearer ".length);

    let userID: string;

    try {
        const { id } = await verify(token, CONFIG.JWT_SECRET, CONFIG.JWT_ALG);
        userID = id as string;
    } catch (_: unknown) {
        ctx.response.status = 401;
        return;
    }

    ctx.state.userID = userID;

    await next();

    delete ctx.state.userID;
};
