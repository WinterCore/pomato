export enum TimerType {
    POMATO = "POMATO",
    SHORT_BREAK = "SHORT_BREAK",
    LONG_BREAK = "LONG_BREAK",
}

export const TIMER_TYPE_LABEL: Record<TimerType, string> = {
    [TimerType.POMATO]: "Pomato",
    [TimerType.SHORT_BREAK]: "Short Break",
    [TimerType.LONG_BREAK]: "Long Break",
};
