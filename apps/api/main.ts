import {Application} from "oak/mod.ts";
import {CONFIG} from "./config.ts";
import {AuthRouter} from "./routes/auth.ts";

// Connect to the database
import "./database.ts";

const app = new Application();

app.addEventListener("listen", ({ hostname, port, secure }) => {
    console.log(`Listening on: ${secure ? "https://" : "http://"}${hostname ?? "localhost"}:${port}`);
});

app.use(AuthRouter.routes());

await app.listen({ port: CONFIG.PORT });
