import React from "react";
import {Theme, ThemeProvider as EmotionThemeProvider} from "@emotion/react";

export type ThemeMode = "dark" | "light";

declare module "@emotion/react" {
    export interface Theme {
        readonly background: string;
    }
}

const THEMES: Record<ThemeMode, Theme> = {
    dark: {
        background: "#000",
    },
    light: {
        background: "#FFF",
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
