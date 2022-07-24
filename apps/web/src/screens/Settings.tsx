import styled from "@emotion/styled";
import {animated, easings, useTransition} from "@react-spring/web";
import React, {HTMLAttributes} from "react";
import {IItemPickerRecord, ItemPicker} from "../components/ItemPicker";
import {DarkModeIcon} from "../icons/DarkMode";
import {InvertColorsIcon} from "../icons/InvertColors";
import {LightModeIcon} from "../icons/LightMode";
import {TimeIcon} from "../icons/Time";
import {useSettings} from "../store/settings.store";
import {TIMER_TYPE_LABEL} from "../store/timer.store";
import {ThemeMode} from "../theme";
import {TimerType} from "../types/common";

interface ISettingsScreenProps extends HTMLAttributes<HTMLDivElement> {
    readonly open: boolean;
    readonly closeSettings: () => void;
}

const COLOR_SCHEME_PICKER_ITEMS: ReadonlyArray<IItemPickerRecord<ThemeMode>> = [
    { key: "dark", label: "Dark", icon: <DarkModeIcon css={{ width: 24 }} /> },
    { key: "light", label: "Light", icon: <LightModeIcon css={{ width: 24 }} /> },
];

export const SettingsScreen: React.FC<ISettingsScreenProps> = (props) => {
    const { open, closeSettings } = props;
    const { settings, updateSettings } = useSettings();

    const transition = useTransition(open, {
        from: { translateY: "100%" },
        enter: { translateY: "0%" },
        leave: { translateY: "100%" },
        config: {
            duration: 300,
            easing: easings.easeOutCubic
        },
    });

    const handleTimerChange = (type: TimerType) => (e: React.ChangeEvent<HTMLInputElement>) =>
        updateSettings({ durations: { [type]: (+e.target.value || 0) * 60 } });

    React.useEffect(() => {
        document.body.style.overflowY = open ? "hidden" : "auto";
    }, [open]);

    const changeTheme = React.useCallback((item: IItemPickerRecord<ThemeMode>) =>
        updateSettings({ theme: item.key }), [updateSettings]);
    
    const getFieldValue = (type: TimerType) => settings.durations[type] !== 0 ? settings.durations[type] / 60 : "";

    return transition((styles, shown) => shown && (
        <Backdrop onClick={closeSettings} style={styles}>
            <Container onClick={e => e.stopPropagation()}>
                <Heading>App Settings</Heading>
                <HR />
                <OptionContainer type="col">
                    <OptionLabel css={{ fontSize: 16 }}>
                        <InvertColorsIcon />
                        Color Scheme
                    </OptionLabel>
                    <ItemPicker
                        items={COLOR_SCHEME_PICKER_ITEMS}
                        selected={settings.theme}
                        onChange={changeTheme}
                    />
                </OptionContainer>

                <OptionContainer type="col">
                    <OptionLabel css={{ fontSize: 16 }}>
                        <TimeIcon />
                        Time (Minutes)
                    </OptionLabel>
                    <OptionContainer type="row" css={{ marginTop: 12 }}>
                        <OptionLabel>{TIMER_TYPE_LABEL[TimerType.POMATO]}</OptionLabel>
                        <Input type="number"
                               css={{ maxWidth: 100 }}
                               value={getFieldValue(TimerType.POMATO)}
                               onChange={handleTimerChange(TimerType.POMATO)} />
                    </OptionContainer>
                    <OptionContainer type="row" css={{ marginTop: 12 }}>
                        <OptionLabel>{TIMER_TYPE_LABEL[TimerType.SHORT_BREAK]}</OptionLabel>
                        <Input type="number"
                               css={{ maxWidth: 100 }}
                               value={getFieldValue(TimerType.SHORT_BREAK)}
                               onChange={handleTimerChange(TimerType.SHORT_BREAK)} />
                    </OptionContainer>
                    <OptionContainer type="row" css={{ marginTop: 12 }}>
                        <OptionLabel>{TIMER_TYPE_LABEL[TimerType.LONG_BREAK]}</OptionLabel>
                        <Input type="number"
                               css={{ maxWidth: 100 }}
                               value={getFieldValue(TimerType.LONG_BREAK)}
                               onChange={handleTimerChange(TimerType.LONG_BREAK)} />
                    </OptionContainer>
                </OptionContainer>
            </Container>
        </Backdrop>
    ));
};

const Backdrop = styled(animated.div)`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    z-index: 10;
    padding-top: 100px;
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-y: auto;
`;

const Container = styled(animated.div)`
    width: 100%;
    max-width: 600px;
    flex: 1;
    margin: 0 auto;
    color: ${({ theme }) => theme.palette.typography.primary};
    background: ${({ theme }) => theme.palette.background.paper};
    padding: 42px;
    border-radius: 22px 22px 0 0;
`;

const Heading = styled.h1`
    font-size: 32px;
    font-weight: bold;
`;

const OptionLabel = styled.div`
    font-size: 14px;

    & svg {
        margin-right: 8px;
        width: 32px;
    }

    display: flex;
    align-items: center;
`;

interface IOptionContainerProps {
    readonly type?: "row" | "col";
}

const OptionContainer = styled("div", { shouldForwardProp: prop => prop !== "type" })
<IOptionContainerProps>`
    margin-top: 24px;

    ${({ type = "row" }) => type === "row" ? `
        display: flex;
        align-items: center;
        justify-content: space-between;
    ` : ""}

    ${({ type }) => type === "col" ? `
    ` : ""}
`;

const HR = styled.div`
    width: 100%;
    height: 1px;
    background: ${({ theme: { palette, helpers } }) => helpers.withAlpha(palette.typography.hint, 0.3)};
    margin: 40px 0;
`;

const Input = styled.input`
    border-radius: 10px;
    background: ${({ theme }) => theme.palette.background.secondary};
    border: none;
    padding: 10px 14px;
    color: ${({ theme }) => theme.palette.typography.primary};
    outline: 0;

    &:hover {
        outline: none;
    }

    -moz-appearance: textfield;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

`;
