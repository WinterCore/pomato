import {config} from "dotenv/mod.ts";

const env = config({ safe: true });

export const CONFIG = {
    PORT: +(env.PORT || "8081"),
    GOOGLE_CLIENT_ID: env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: env.GOOGLE_CLIENT_SECRET,
    FRONTEND_DOMAIN: env.FRONTEND_DOMAIN,
    API_DOMAIN: env.API_DOMAIN,
    MONGO_URL: env.MONGO_URL,
};
