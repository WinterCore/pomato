import {useTimerStore} from "../store/timer/timer.store";
import {PauseIcon} from "../icons/Pause";
import {PlayIcon} from "../icons/Play";

export const TimerControls: React.FC = () => {
    const { state: { isStarted }, start, stop } = useTimerStore();

    return (
        <>
            {isStarted && <PauseIcon css={{ cursor: "pointer" }} onClick={stop} />}
            {! isStarted && <PlayIcon css={{ cursor: "pointer" }} onClick={start} />}
        </>
    );
};
