import React from "react";
import {ThemeProvider} from "./theme";
import {SettingsProvider} from "./store/settings.store";
import {MainScreen} from "./screens/Main";
import {SettingsScreen} from "./screens/Settings";

export const App: React.FC = () => {
    const [settingsOpen, setSettingsOpen] = React.useState<boolean>(false);

    const toggleSettings = React.useCallback((state?: boolean) => () => 
        setSettingsOpen(open => state !== undefined ? state : ! open), [setSettingsOpen]);

    return (
        <SettingsProvider>
            <ThemeProvider>
                <MainScreen toggleSettings={toggleSettings()} />
                <SettingsScreen open={settingsOpen} closeSettings={toggleSettings(false)} />
            </ThemeProvider>
        </SettingsProvider>
    );
};

