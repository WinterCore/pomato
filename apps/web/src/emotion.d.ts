/// <reference types="@emotion/react/types/css-prop" /

import {Theme} from "@emotion/react";

type PaletteKeys = "primary" | "secondary" | "hint" | "paper";

declare module "@emotion/react" {
    export interface Theme extends BaseTheme {
        readonly mode: "light" | "dark";

        readonly helpers: ThemeHelpers;

        readonly breakpoints: ThemeBreakpoints;

        readonly palette: {
            readonly accent: string;
            readonly background: Partial<Record<PaletteKeys, string>>;
            readonly typography: Partial<Record<PaletteKeys, string>>;
        };
    }
}
