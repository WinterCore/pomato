import {ThemeMode} from "./theme.ts";
import {TimerType} from "./timer.ts";

export interface ISettings {
    readonly durations: Record<TimerType, number>;
    readonly theme: ThemeMode;
    
    /**
     * The default notification volume
     *
     * A value between 0 and 1
     */
    readonly notificationVolume: number;
}
