import React from "react";
import {TimerType} from "../types/common";
import debounce from "debounce";
import {ThemeMode} from "../theme";

export interface ISettings {
    readonly durations: Record<TimerType, number>;
    readonly theme: ThemeMode;
}

interface PartialSettings extends Omit<Partial<ISettings>, "durations"> {
    readonly durations?: Partial<ISettings["durations"]>;
}

interface ISettingsStore {
    readonly settings: ISettings;
    readonly updateSettings: (updatedSettings: PartialSettings) => void;
}

const SettingsContext = React.createContext<ISettingsStore | null>(null);

const DEFAULT_DURATIONS = {
    [TimerType.POMATO]: 25 * 60,
    [TimerType.SHORT_BREAK]: 5 * 60,
    [TimerType.LONG_BREAK]: 15 * 60,
};

const getDefaultSettings = (): ISettings => {
    const raw = window.localStorage.getItem("settings");

    if (! raw) {
        return {
            durations: DEFAULT_DURATIONS,
            theme: "dark",
        };
    }

    const { durations = DEFAULT_DURATIONS, theme = "dark" } = JSON.parse(raw) as ISettings;

    return {
        durations,
        theme,
    };
};

const DEFAULT_SETTINGS: ISettings = getDefaultSettings();

interface ISettingsProviderProps {
    readonly children: React.ReactNode;
}

const storeSettings = debounce((settings: ISettings) => {
    window.localStorage.setItem("settings", JSON.stringify(settings));
}, 1000);

export const SettingsProvider: React.FC<ISettingsProviderProps> = (props) => {
    const { children } = props;

    const [settings, setSettings] = React.useState<ISettings>(DEFAULT_SETTINGS);
    const settingsRef = React.useRef<ISettings>(DEFAULT_SETTINGS);
    settingsRef.current = settings;

    const updateSettings = React.useCallback(({ durations, ...restSettings }: PartialSettings) => {
        const oldSettings = settingsRef.current;
        const newSettings: ISettings = {
            ...oldSettings,
            durations: {
                ...oldSettings.durations,
                ...durations,
            },
            ...restSettings,
        };
        setSettings(newSettings);
        storeSettings(newSettings);
    }, [setSettings]);

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
