import React from "react";

export interface ISettings {
    readonly durations: {
        readonly pomodoro: number;
        readonly shortBreak: number;
        readonly longBreak: number;
    };
}

interface ISettingsStore {
    readonly settings: ISettings;
    readonly updateSettings: (updatedSettings: Partial<ISettings>) => void;
}

const SettingsContext = React.createContext<ISettingsStore | null>(null);

const DEFAULT_SETTINGS: ISettings = {
    durations: {
        pomodoro: 25 * 60,
        longBreak: 15 * 60,
        shortBreak: 5 * 60,
    },
};

interface ISettingsProviderProps {
    readonly children: React.ReactNode;
}

export const SettingsProvider: React.FC<ISettingsProviderProps> = (props) => {
    const { children } = props;

    const [settings, setSettings] = React.useState<ISettings>(DEFAULT_SETTINGS);

    const updateSettings = React.useCallback((updatedSettings: Partial<ISettings>) =>
        setSettings(settings => ({ ...settings, ...updatedSettings })), [setSettings]);

    const store = React.useMemo(() => ({ settings, updateSettings }), [settings, updateSettings]);

    return <SettingsContext.Provider value={store} children={children} />;
};

export const useSettings = () => {
    const settings = React.useContext(SettingsContext);

    if (! settings) {
        throw new Error("useSettings must be used in a component that's wrapped within SettingsProvider");
    }

    return settings;
};
