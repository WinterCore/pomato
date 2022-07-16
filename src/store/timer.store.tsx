import React, {Dispatch} from "react";

export enum TimerType {
    POMODORO,
    SHORT_BREAK,
    LONG_BREAK,
}

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

const DEFAULT_STATE: ITimerStoreState = {
    type: TimerType.POMODORO,
    isStarted: false,
    secondsLeft: 60 * 25,
};

function timerStoreReducer(state: ITimerStoreState, action: ITimerStoreAction): ITimerStoreState {
    switch(action.type) {
        case TimerStoreActionType.START:
            return { ...state, isStarted: true };
        case TimerStoreActionType.STOP:
            return { ...state, isStarted: false };
        case TimerStoreActionType.DECREMENT:
            return { ...state, secondsLeft: state.secondsLeft - 1 };
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
    const [state, dispatch] = React.useReducer(timerStoreReducer, DEFAULT_STATE);
    const { isStarted } = state;

    React.useEffect(() => {
        if (! isStarted) {
            return;
        }

        const intervalID = setInterval(() => dispatch({ type: TimerStoreActionType.DECREMENT }), 1000);

        return () => clearInterval(intervalID);
    }, [isStarted, dispatch]);

    const store = React.useMemo(() => ({ state, dispatch }), [state, dispatch]);

    return <TimerContext.Provider value={store} children={children} />;
};

const playAudio = new Audio("/assets/play.mp3");
const pauseAudio = new Audio("/assets/pause.mp3");

export const useTimerStore = () => {
    const store = React.useContext(TimerContext);

    if (! store) {
        throw new Error("useTimerStore must be used within a component that's wrapped with TimerStoerProvider");
    }

    const { state, dispatch } = store;

    const start = React.useCallback(() => {
        dispatch({ type: TimerStoreActionType.START });
        playAudio.play().catch(console.error);
    }, [dispatch]);
    const stop = React.useCallback(() => {
        dispatch({ type: TimerStoreActionType.STOP });
        pauseAudio.play().catch(console.error);
    }, [dispatch]);

    return {
        ...state,
        start,
        stop
    };
};
