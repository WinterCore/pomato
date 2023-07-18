import {ISettings} from "./settings.ts";

export type ThemeMode = ISettings["theme"];

export interface ThemeBreakpoints {
    readonly xs: number;
    readonly sm: number;
    readonly md: number;
    readonly lg: number;
    readonly xl: number;
}

export interface Theme {
    readonly mode: ThemeMode;

    readonly breakpoints: ThemeBreakpoints;

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
