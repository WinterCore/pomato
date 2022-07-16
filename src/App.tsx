import React from "react";
import styled from "@emotion/styled";
import {ThemeProvider} from "./theme";
import {TimerDisplay} from "./components/TimerDisplay";
import {SettingsProvider} from "./store/settings.store";
import {TimerStoreProvider} from "./store/timer.store";
import {TimerControls} from "./components/TimerControls";
import {SettingsIcon} from "./icons/Settings";

export const App: React.FC = () => {
    const [zenMode, setZenMode] = React.useState(false);

    React.useEffect(() => {
        const handleEnter = () => setZenMode(false);
        const handleLeave = () => setZenMode(true);
        
        document.addEventListener("mouseleave", handleLeave);
        document.addEventListener("mouseenter", handleEnter);

        return () => {
            document.removeEventListener("mouseleave", handleLeave);
            document.removeEventListener("mouseenter", handleEnter);
        };
    }, [setZenMode]);

    return (
        <ThemeProvider mode="dark">
            <SettingsProvider>
                <Main>
                    <TimerStoreProvider>
                        <TimerDisplayContainer>
                            <TimerDisplay />

                            {! zenMode && (
                                <ControlsContainer>
                                    <TimerControls />
                                </ControlsContainer>
                            )}
                        </TimerDisplayContainer>
                    </TimerStoreProvider>
                    {! zenMode && <SettingsCog />}
                </Main>
            </SettingsProvider>
        </ThemeProvider>
    );
};

const Main = styled.main`
    background: ${({ theme }) => theme.background};
    min-height: 100vh;
    max-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ControlsContainer = styled.div`
    position: absolute;
    bottom: -100px;
    left: 0;
    display: flex;
    justify-content: center;
    width: 100%;
`;

const TimerDisplayContainer = styled.div`
    position: relative;
`;

const SettingsCog = styled(SettingsIcon)`
    position: absolute;
    top: 24px;
    right: 24px;
    width: 24px;
    cursor: pointer;

    fill: ${({ theme }) => theme.C500};

    transition: all 150ms ease-in-out;

    &:hover {
        transform: rotate(45deg);
        fill: ${({ theme }) => theme.foreground};
    }
`;
