import React from "react";
import {ThemeProvider} from "./theme.js";
import {SettingsProvider} from "./store/settings.store.js";
import {MainScreen} from "./screens/Main.js";
import {SettingsScreen} from "./screens/Settings.js";
import {UserProvider} from "./store/user.store.js";
import {AccountScreen} from "./screens/Account.js";

export const App = () => {
    const [settingsOpen, setSettingsOpen] = React.useState<boolean>(false);
    const [accountOpen, setAccountOpen] = React.useState<boolean>(false);

    const toggleSettings = React.useCallback((state?: boolean) => () => 
        setSettingsOpen(open => state !== undefined ? state : ! open), [setSettingsOpen]);
    const toggleAccount = React.useCallback((state?: boolean) => () => 
        setAccountOpen(open => state !== undefined ? state : ! open), [setAccountOpen]);

    return (
        <Providers>
            <MainScreen toggleSettings={toggleSettings()} toggleAccount={toggleAccount()} />
            <SettingsScreen open={settingsOpen} close={toggleSettings(false)} />
            <AccountScreen open={accountOpen} close={toggleAccount(false)} />
        </Providers>
    );
};


interface IProvidersProps {
    readonly children?: React.ReactNode;
}

const Providers = ({ children }: IProvidersProps) => (
    <SettingsProvider>
        <ThemeProvider>
            <UserProvider>
                {children}
            </UserProvider>
        </ThemeProvider>
    </SettingsProvider>
);
