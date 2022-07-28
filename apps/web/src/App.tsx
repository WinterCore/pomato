import React from "react";
import {ThemeProvider} from "./theme";
import {SettingsProvider} from "./store/settings.store";
import {MainScreen} from "./screens/Main";
import {SettingsScreen} from "./screens/Settings";
import {UserProvider} from "./store/user.store";
import {AccountScreen} from "./screens/Account";

export const App: React.FC = () => {
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


const Providers: React.FC<React.PropsWithChildren> = ({ children }) => (
    <SettingsProvider>
        <ThemeProvider>
            <UserProvider>
                {children}
            </UserProvider>
        </ThemeProvider>
    </SettingsProvider>
);
