import React, {HTMLAttributes} from "react";
import {TimerDisplay} from "../components/TimerDisplay.js";
import {TimerStoreProvider} from "../store/timer/timer.store.js";
import {TimerControls} from "../components/TimerControls.js";
import {TimerTypeControl} from "../components/TimerTypeControl.js";
import {animated, Spring} from "@react-spring/web";
import {useZenMode} from "../hooks/use-zen-mode.js";
import styled from "@emotion/styled";
import {Navbar} from "../components/Navbar.js";

interface IMainScreenProps extends HTMLAttributes<HTMLElement> {
    readonly toggleSettings: () => void;
    readonly toggleAccount: () => void;
}

export const MainScreen: React.FC<IMainScreenProps> = (props) => {
    const { toggleSettings, toggleAccount } = props;
    const zenMode = useZenMode();

    return (
        <Main>
            <Navbar zenMode={zenMode}
                    toggleSettings={toggleSettings}
                    toggleAccount={toggleAccount} />
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
        </Main>
    );
};

const Main = styled.main`
    color: ${({ theme }) => theme.palette.typography.primary};
    background: ${({ theme }) => theme.palette.background.primary};
    min-height: 100vh;
    display: flex;
    flex-direction: column;
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
