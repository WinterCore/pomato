export interface IRecordWithLabel<T extends string = string> {
    readonly key: T;
    readonly label: string;
}
