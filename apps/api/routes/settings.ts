import {Router} from "oak/mod.ts";
import {Bson} from "mongo/mod.ts";
import {users} from "../database/users.ts";
import {authenticated, IAuthState} from "../middleware/authenticated.ts";

export const SettingsRouter = new Router<IAuthState>();

SettingsRouter.use(authenticated);

SettingsRouter.get("/settings", async (ctx) => {
    const data = await users.findOne(
        { _id: new Bson.ObjectId(ctx.state.userID) },
        {  },
    );

    if (! data) {
        return ctx.response.status = 500;
    }


});
