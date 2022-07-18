import React from "react";
import {TimerType} from "../types/common";

export interface ISettings {
    readonly durations: Record<TimerType, number>;
}

interface ISettingsStore {
    readonly settings: ISettings;
    readonly updateSettings: (updatedSettings: Partial<ISettings>) => void;
}

const SettingsContext = React.createContext<ISettingsStore | null>(null);

const DEFAULT_SETTINGS: ISettings = {
    durations: {
        [TimerType.POMATO]: 5,
        [TimerType.SHORT_BREAK]: 2,
        [TimerType.LONG_BREAK]: 15 * 60,
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
