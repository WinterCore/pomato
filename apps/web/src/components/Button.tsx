import styled from "@emotion/styled";
import React, {HTMLAttributes} from "react";

interface IButtonProps extends HTMLAttributes<HTMLButtonElement> {
    readonly icon?: React.ReactNode;
}


export const Button = (props: IButtonProps) => {
    const { icon, children, ...restProps } = props;

    return (
        <StyledButton {...restProps}>
            {icon}
            {children}
        </StyledButton>
    );
};

export const StyledButton = styled.button`
    position: relative;
    padding: 12px 25px;
    font-size: 14px;
    font-weight: 700;
    z-index: 10;
    transition: all 500ms;
    border: 2px solid transparent;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;

    color: ${({ theme }) => theme.palette.typography.primary};
    background-color: ${({ theme }) => theme.palette.background.secondary};

    &::after {
        background-color: ${({ theme }) => theme.palette.typography.primary};
        content: "";
        position: absolute;
        z-index: -1;
        transition: all 500ms;
        border-radius: 5px;
        top: 0; 
        right: 0;
        width: 0;       
        height: 100%;
    }

    &:hover {
        color: ${({ theme }) => theme.palette.background.secondary};
        border-color: ${({ theme }) => theme.palette.background.secondary};

        &::after {
            width: 100%;
            left: 0;
            right: auto;
        }
    }
`;
