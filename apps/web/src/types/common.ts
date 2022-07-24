export enum TimerType {
    POMATO = "POMATO",
    SHORT_BREAK = "SHORT_BREAK",
    LONG_BREAK = "LONG_BREAK",
}

export interface IRecordWithLabel<T extends string = string> {
    readonly key: T;
    readonly label: string;
}
