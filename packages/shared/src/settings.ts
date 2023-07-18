import z from "zod";
import {timerDurationsSchema} from "./timer.ts";

export const settingsSchema = z.object({
    notificationVolume: z.number().min(0).max(1),
    theme: z.enum(["light", "dark"]).default("dark"),
    durations: timerDurationsSchema,
})

export type ISettings = z.infer<typeof settingsSchema>;
