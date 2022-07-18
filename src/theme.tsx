import React from "react";
import {Theme, ThemeProvider as EmotionThemeProvider} from "@emotion/react";
import {useSettings} from "./store/settings.store";

export type ThemeMode = "dark" | "light";

interface ThemeHelpers {
    readonly withAlpha: (color: string, opacity: number) => string;
}

interface ThemeBreakpoints {
    readonly xs: number;
    readonly sm: number;
    readonly md: number;
    readonly lg: number;
    readonly xl: number;
}

declare module "@emotion/react" {
    export interface Theme {
        readonly mode: ThemeMode;
        readonly helpers: ThemeHelpers;

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
}

const THEME_HELPERS: ThemeHelpers = {
    withAlpha: (color, opacity) => {
        const clamped = Math.max(0, Math.min(opacity, 1));
        const value = Math.floor(255 * clamped).toString(16);
        const prefix = value.length === 1 ? "0" : "";

        return `${color}${prefix}${value}`;
    },
};

const THEME_BREAKPOINTS: ThemeBreakpoints = {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
};

const THEMES: Record<ThemeMode, Theme> = {
    dark: {
        mode: "dark",
        helpers: THEME_HELPERS,
        breakpoints: THEME_BREAKPOINTS,
        palette: {
            background: {
                primary: "#0c0c0d",
                secondary: "#1e1d1f",
                paper: "#313033",
            },
            typography: {
                primary: "#FFFFFF",
                secondary: "",
                hint: "#83818c",
            }
        },
    },
    light: {
        mode: "light",
        helpers: THEME_HELPERS,
        breakpoints: THEME_BREAKPOINTS,
        palette: {
            background: {
                primary: "#1e1e20",
                secondary: "#fff",
                paper: "#28272c",
            },
            typography: {
                primary: "#FFFFFF",
                secondary: "",
                hint: "#83818c",
            }
        },
    },
};

interface IThemeModeContext {
    readonly mode: ThemeMode;
    readonly setMode: (mode: ThemeMode) => void;
}

const ThemeModeContext = React.createContext<IThemeModeContext | null>(null);

interface IThemeProviderProps {
    readonly children: React.ReactNode;
}

export const ThemeProvider: React.FC<IThemeProviderProps> = (props) => {
    const { ...restProps } = props;
    const { settings: { theme: mode }, updateSettings } = useSettings();

    const setMode = React.useCallback((theme: ThemeMode) =>
        updateSettings({ theme }), [updateSettings]);

    const theme = React.useMemo(() => THEMES[mode], [mode]);

    const providerValue = React.useMemo(() => ({ mode, setMode }), [mode, setMode]);

    return (
        <ThemeModeContext.Provider value={providerValue}>
            <EmotionThemeProvider {...restProps} theme={theme} />
        </ThemeModeContext.Provider>
    );
};

export const useThemeMode = () => {
    const store = React.useContext(ThemeModeContext);

    if (! store) {
        throw new Error("useThemeMode must be used in a component that's wrapped within ThemeModeContext.Provider");
    }

    return store;
};
