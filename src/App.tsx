import React from "react";
import styled from "@emotion/styled";
import {ThemeProvider} from "./theme";
import {TimerDisplay} from "./components/TimerDisplay";
import {SettingsProvider} from "./store/settings.store";
import {TimerStoreProvider} from "./store/timer.store";
import {TimerControls} from "./components/TimerControls";
import {SettingsCog} from "./components/SettingsCog";
import {TimerTypeControl} from "./components/TimerTypeControl";
import {animated, Spring} from "@react-spring/web";

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
                            <TimerTypeControl />
                            <TimerDisplay css={{ margin: "40px 0 100px" }} />

                            <Spring to={{ opacity: zenMode ? 0 : 1 }}>
                                {styles => (
                                    <ControlsContainer style={styles}>
                                        <TimerControls />
                                    </ControlsContainer>
                                )}
                            </Spring>
                        </TimerDisplayContainer>
                    </TimerStoreProvider>
                    <Spring to={{ opacity: zenMode ? 0 : 1 }}>
                        {styles => <animated.div style={styles}><SettingsCog /></animated.div>}
                    </Spring>
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

const ControlsContainer = styled(animated.div)`
    display: flex;
    justify-content: center;
    width: 100%;
`;

const TimerDisplayContainer = styled.div`
    position: relative;
`;
