import React, {Dispatch} from "react";
import {useSettings} from "./settings.store";
import {TimerType} from "../types/common";
import {usePrevious} from "../hooks/use-previous";

export const TIMER_TYPE_LABEL: Record<TimerType, string> = {
    [TimerType.POMATO]: "Pomato",
    [TimerType.SHORT_BREAK]: "Short Break",
    [TimerType.LONG_BREAK]: "Long Break",
};

interface ITimerStoreState {
    readonly type: TimerType;
    readonly secondsLeft: number;
    readonly isStarted: boolean;
}

enum TimerStoreActionType {
    STOP,
    START,
    CHANGE_TYPE,
    DECREMENT,
}

interface IActionStop {
    readonly type: TimerStoreActionType.STOP;
}

interface IActionStart {
    readonly type: TimerStoreActionType.START;
}

interface IActionDecrement {
    readonly type: TimerStoreActionType.DECREMENT;
}

interface IActionChangeType {
    readonly type: TimerStoreActionType.CHANGE_TYPE;
    readonly payload: {
        readonly type: TimerType;
        readonly duration: number;
    };
}

type ITimerStoreAction = IActionStop | IActionStart | IActionChangeType | IActionDecrement;

interface ITimerStore {
    readonly state: ITimerStoreState;
    readonly dispatch: Dispatch<ITimerStoreAction>;
}

const TimerContext = React.createContext<ITimerStore | null>(null);

function timerStoreReducer(state: ITimerStoreState, action: ITimerStoreAction): ITimerStoreState {
    switch(action.type) {
        case TimerStoreActionType.START:
            return { ...state, isStarted: true };
        case TimerStoreActionType.STOP:
            return { ...state, isStarted: false };
        case TimerStoreActionType.DECREMENT:
            return { ...state, secondsLeft: Math.max(state.secondsLeft - 1, 0) };
        case TimerStoreActionType.CHANGE_TYPE: {
            const { payload: { type, duration } } = action;

            return { type, secondsLeft: duration, isStarted: false };
        };
    }
}

interface ITimerStoreProviderProps {
    readonly children: React.ReactNode;
}

export const TimerStoreProvider: React.FC<ITimerStoreProviderProps> = (props) => {
    const { children } = props;
    const { settings: { durations } } = useSettings();
    const [state, dispatch] = React.useReducer(timerStoreReducer, {
        type: TimerType.POMATO,
        isStarted: false,
        secondsLeft: durations[TimerType.POMATO],
    });

    const { isStarted } = state;

    const intervalIDRef = React.useRef<number | null>(null);

    React.useEffect(() => {
        if (! isStarted) {
            return;
        }

        intervalIDRef.current = setInterval(() => dispatch({ type: TimerStoreActionType.DECREMENT }), 1000);

        return () => clearInterval(intervalIDRef.current || undefined);
    }, [isStarted, dispatch, intervalIDRef]);

    React.useEffect(() => {
        if (state.secondsLeft > 0 || ! state.isStarted) {
            return;
        }

        clearInterval(intervalIDRef.current || undefined);

        // Play sound
        alarmAudio.load();
        alarmAudio.play().catch(console.error);

        const newType = state.type === TimerType.POMATO ? TimerType.SHORT_BREAK : TimerType.POMATO; 
        
        dispatch({
            type: TimerStoreActionType.CHANGE_TYPE,
            payload: {
                type: newType,
                duration: durations[newType],
            },
        });
    }, [state, dispatch, durations]);


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
    }, [currentDuration, prevDuration, state.type]);

    const store = React.useMemo(() => ({ state, dispatch }), [state, dispatch]);

    return <TimerContext.Provider value={store} children={children} />;
};

const playAudio = new Audio("/assets/play.mp3");
const pauseAudio = new Audio("/assets/pause.mp3");
const alarmAudio = new Audio("/assets/alarm.mp3");

export const useTimerStore = () => {
    const store = React.useContext(TimerContext);

    if (! store) {
        throw new Error("useTimerStore must be used within a component that's wrapped with TimerStoerProvider");
    }

    const { settings: { durations } } = useSettings();

    const { state, dispatch } = store;

    const start = React.useCallback(() => {
        dispatch({ type: TimerStoreActionType.START });
        playAudio.play().catch(console.error);
    }, [dispatch]);

    const stop = React.useCallback(() => {
        dispatch({ type: TimerStoreActionType.STOP });
        pauseAudio.play().catch(console.error);
    }, [dispatch]);

    const changeType = React.useCallback((timerType: TimerType) => {
        dispatch({
            type: TimerStoreActionType.CHANGE_TYPE,
            payload: {
                type: timerType,
                duration: durations[timerType],
            },
        });
    }, [dispatch, durations]);

    return {
        ...state,
        start,
        stop,
        changeType,
    };
};
