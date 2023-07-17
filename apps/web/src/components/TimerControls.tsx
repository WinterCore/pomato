import {useTimerStore} from "../store/timer/timer.store.js";
import {PauseIcon} from "../icons/Pause.js";
import {PlayIcon} from "../icons/Play.js";

export const TimerControls: React.FC = () => {
    const { state: { isStarted }, start, stop } = useTimerStore();

    return (
        <>
            {isStarted && <PauseIcon css={{ cursor: "pointer" }} onClick={stop} />}
            {! isStarted && <PlayIcon css={{ cursor: "pointer" }} onClick={start} />}
        </>
    );
};
