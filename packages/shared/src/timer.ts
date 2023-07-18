import z from "zod";

export const timerDurationsSchema = z.object({
    POMATO: z.number().min(0),
    SHORT_BREAK: z.number().min(0),
    LONG_BREAK: z.number().min(0),
});

export type TimerType = keyof z.infer<typeof timerDurationsSchema>;

export const TIMER_TYPE_LABEL: Record<TimerType, string> = {
    POMATO: "Pomato",
    SHORT_BREAK: "Short Break",
    LONG_BREAK: "Long Break",
};
