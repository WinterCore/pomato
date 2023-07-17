import React from "react";
import {animated, easings, useTransition} from "@react-spring/web";
import styled from "@emotion/styled";

interface IModalPopupProps {
    readonly open: boolean;
    readonly onClose: () => void;
    readonly children: React.ReactNode;
}

export const ModalPopup: React.FC<IModalPopupProps> = (props) => {
    const { open, onClose, children } = props;

    const transition = useTransition(open, {
        from: { translateY: "100%" },
        enter: { translateY: "0%" },
        leave: { translateY: "100%" },
        config: {
            duration: 300,
            easing: easings.easeOutCubic
        },
    });

    React.useEffect(() => {
        document.body.style.overflowY = open ? "hidden" : "auto";
    }, [open]);

    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    return transition((styles, shown) => shown && (
        <Backdrop onClick={onClose} style={styles}>
            <Container onClick={e => e.stopPropagation()} children={children} />
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

const Container = styled.div`
    width: 100%;
    max-width: 600px;
    flex: 1;
    margin: 0 auto;
    color: ${({ theme }) => theme.palette.typography.primary};
    background: ${({ theme }) => theme.palette.background.paper};
    padding: 42px;
    border-radius: 22px 22px 0 0;
`;

export const ModalPopupHeading = styled.h1`
    font-size: 32px;
    font-weight: bold;
`;


export const ModalPopupSeparator = styled.div`
    width: 100%;
    height: 1px;
    background: ${({ theme: { palette, helpers } }) => helpers.withAlpha(palette.typography.hint, 0.3)};
    margin: 40px 0;
`;
