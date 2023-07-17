import React from "react";
import {useSettings} from "../settings.store.js";
import {TimerType} from "../../types/common.js";
import {usePrevious} from "../../hooks/use-previous.js";
import {ITimerStoreState, TimerStoreActionType, timerStoreReducer} from "../timer/timer.reducer.js";
import {AudioNotificationType, useAudioNotifications} from "../../hooks/use-audio-notifications.js";
import TimerWorker from "./timer.worker?worker&inline";
import {IEvent, ISubscriptionEvent} from "./timer.worker.js";

const worker = new TimerWorker();

export const TIMER_TYPE_LABEL: Record<TimerType, string> = {
    [TimerType.POMATO]: "Pomato",
    [TimerType.SHORT_BREAK]: "Short Break",
    [TimerType.LONG_BREAK]: "Long Break",
};

interface ITimerStore {
    readonly state: ITimerStoreState;
    readonly start: () => void;
    readonly stop: () => void;
    readonly changeType: (newType: TimerType) => void;
}

const TimerContext = React.createContext<ITimerStore | null>(null);

interface ITimerStoreProviderProps {
    readonly children: React.ReactNode;
}


export const TimerStoreProvider: React.FC<ITimerStoreProviderProps> = (props) => {
    const { children } = props;
    const { settings: { durations } } = useSettings();
    const play = useAudioNotifications();

    const [state, dispatch] = React.useReducer(timerStoreReducer, {
        type: TimerType.POMATO,
        isStarted: false,
        secondsLeft: durations[TimerType.POMATO],
    });

    React.useEffect(() => {
        const onMessage = (e: MessageEvent<ISubscriptionEvent>) => {
            const event = e.data;

            switch (event.type) {
                case "time-changed": {
                    const { seconds } = event;
                    dispatch({ type: TimerStoreActionType.SET, payload: seconds });
                    break;
                }

                case "finished": {
                    play(AudioNotificationType.ALARM);

                    const newType = state.type === TimerType.POMATO
                        ? TimerType.SHORT_BREAK
                        : TimerType.POMATO; 
                    
                    dispatch({
                        type: TimerStoreActionType.CHANGE_TYPE,
                        payload: {
                            type: newType,
                            duration: durations[newType],
                        },
                    });    
                    worker.postMessage({ type: "set-time", seconds: durations[newType] } as IEvent);
                }
            }
        };

        worker.addEventListener("message", onMessage);

        return () => worker.removeEventListener("message", onMessage);
    }, [dispatch, durations, state.type, play]);

    const currentDuration = durations[state.type];
    const prevDuration = usePrevious(currentDuration);

    React.useEffect(() => {
        if (currentDuration === prevDuration) {
            return;
        }

        dispatch({
            type: TimerStoreActionType.CHANGE_TYPE,
            payload: {
                type: state.type,
                duration: currentDuration,
            },
        });
        worker.postMessage({ type: "set-time", seconds: currentDuration } as IEvent)
    }, [currentDuration, prevDuration, state.type]);

    const start = React.useCallback(() => {
        play(AudioNotificationType.PLAY);
        dispatch({ type: TimerStoreActionType.START });
        worker.postMessage({ type: "start" } as IEvent);
    }, [dispatch, play]);

    const stop = React.useCallback(() => {
        play(AudioNotificationType.PAUSE);
        dispatch({ type: TimerStoreActionType.STOP });
        worker.postMessage({ type: "stop" } as IEvent);
    }, [dispatch, play]);

    const changeType = React.useCallback((timerType: TimerType) => {
        dispatch({
            type: TimerStoreActionType.CHANGE_TYPE,
            payload: {
                type: timerType,
                duration: durations[timerType],
            },
        });

        worker.postMessage({ type: "set-time", seconds: durations[timerType] } as IEvent);
    }, [dispatch, durations]);

    const store = React.useMemo(() =>
        ({ state, start, stop, changeType }), [state, start, stop, changeType]);

    return <TimerContext.Provider value={store} children={children} />;
};

export const useTimerStore = () => {
    const store = React.useContext(TimerContext);

    if (! store) {
        throw new Error("useTimerStore must be used within a component that's wrapped with TimerStoerProvider");
    }

    return store;
};
