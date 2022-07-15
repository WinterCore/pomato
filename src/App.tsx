import React from "react";
import styled from "@emotion/styled";
import {ThemeProvider} from "./theme";

const Container = styled.div`
    background: ${({ theme }) => theme.background};
    min-height: 100vh;
    max-height: 100vh;
`;

export const App: React.FC = () => {
    return (
        <ThemeProvider mode="dark">
            <Container>
            </Container>
        </ThemeProvider>
    );
};
