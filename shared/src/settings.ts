import {ThemeMode} from "./theme";
import {TimerType} from "./timer";

export interface ISettings {
    readonly durations: Record<TimerType, number>;
    readonly theme: ThemeMode;
}
