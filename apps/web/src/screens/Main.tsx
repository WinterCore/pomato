import React, {HTMLAttributes} from "react";
import {TimerDisplay} from "../components/TimerDisplay";
import {TimerStoreProvider} from "../store/timer.store";
import {TimerControls} from "../components/TimerControls";
import {TimerTypeControl} from "../components/TimerTypeControl";
import {animated, Spring} from "@react-spring/web";
import {useZenMode} from "../hooks/use-zen-mode";
import styled from "@emotion/styled";
import {Navbar} from "../components/Navbar";

interface IMainScreenProps extends HTMLAttributes<HTMLElement> {
    readonly toggleSettings: () => void;
}

export const MainScreen: React.FC<IMainScreenProps> = (props) => {
    const { toggleSettings } = props;
    const zenMode = useZenMode();

    return (
        <Main>
            <Navbar zenMode={zenMode} toggleSettings={toggleSettings} />
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
