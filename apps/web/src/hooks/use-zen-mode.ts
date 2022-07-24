import React from "react";

export const useZenMode = () => {
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

    return zenMode;
};
