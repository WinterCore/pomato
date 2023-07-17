import React from "react";
import {useSettings} from "../store/settings.store.js";

export enum AudioNotificationType {
    PLAY,
    PAUSE,
    ALARM,
};

export const useAudioNotifications = () => {
    const { settings } = useSettings();

    // Add volume and the ability to choose different audio files
    const audioFiles = React.useMemo<Record<AudioNotificationType, HTMLAudioElement>>(() => ({
        [AudioNotificationType.PLAY]: new Audio("/assets/play.mp3"),
        [AudioNotificationType.PAUSE]: new Audio("/assets/pause.mp3"),
        [AudioNotificationType.ALARM]: new Audio("/assets/alarm.mp3"),
    }), []);
    
    const play = React.useCallback((type: AudioNotificationType) => {
        const audio = audioFiles[type];
        audio.load();
        audio.play().catch(console.error);
    }, [audioFiles]);

    return play;
}
