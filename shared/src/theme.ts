export type ThemeMode = "dark" | "light";

export interface Theme {
    readonly mode: ThemeMode;

    readonly palette: {
        readonly background: {
            readonly primary: string;
            readonly secondary: string;
            readonly paper: string;
        };
        readonly typography: {
            readonly primary: string;
            readonly secondary: string;
            readonly hint: string;
        };
    };
}
