import React, {HTMLAttributes} from "react";
import {TimerDisplay} from "../components/TimerDisplay";
import {TimerStoreProvider} from "../store/timer.store";
import {TimerControls} from "../components/TimerControls";
import {SettingsCog} from "../components/SettingsCog";
import {TimerTypeControl} from "../components/TimerTypeControl";
import {animated, Spring} from "@react-spring/web";
import {useZenMode} from "../hooks/use-zen-mode";
import styled from "@emotion/styled";

interface IMainScreenProps extends HTMLAttributes<HTMLElement> {
    readonly toggleSettings: () => void;
}

export const MainScreen: React.FC<IMainScreenProps> = (props) => {
    const { toggleSettings } = props;
    const zenMode = useZenMode();

    return (
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
                {styles => (
                    <animated.div style={styles} onClick={toggleSettings}>
                        <SettingsCog />
                    </animated.div>
                )}
            </Spring>
        </Main>
    );
};

const Main = styled.main`
    background: ${({ theme }) => theme.palette.background.primary};
    min-height: 100vh;
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
