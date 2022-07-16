import React from "react";
import {Theme, ThemeProvider as EmotionThemeProvider} from "@emotion/react";

export type ThemeMode = "dark" | "light";

declare module "@emotion/react" {
    export interface Theme {
        readonly background: string;
        readonly foreground: string;
        readonly C900: string;
        readonly C800: string;
        readonly C700: string;
        readonly C600: string;
        readonly C500: string;
        readonly C400: string;
        readonly C300: string;
        readonly C200: string;
        readonly C100: string;
    }
}

const THEMES: Record<ThemeMode, Theme> = {
    dark: {
        background: "#000",
        foreground: "#FFF",
        C900: "#19181d",
        C800: "#28272c",
        C700: "#3f3f47",
        C600: "#52525c",
        C500: "#71717b",
        C400: "#a1a1ab",
        C300: "#d5d4d9",
        C200: "#e5e4e9",
        C100: "#f4f4f4",
    },
    light: {
        background: "#FFF",
        foreground: "#000",
        C100: "#19181d",
        C200: "#28272c",
        C300: "#3f3f47",
        C400: "#52525c",
        C500: "#71717b",
        C600: "#a1a1ab",
        C700: "#d5d4d9",
        C800: "#e5e4e9",
        C900: "#f4f4f4",
    },
};


interface IThemeProviderProps {
    readonly mode: "dark" | "light";
    readonly children: React.ReactNode;
}

export const ThemeProvider: React.FC<IThemeProviderProps> = (props) => {
    const { mode, ...restProps } = props;

    const theme = React.useMemo(() => THEMES[mode], [mode]);

    return <EmotionThemeProvider {...restProps} theme={theme} />;
};
