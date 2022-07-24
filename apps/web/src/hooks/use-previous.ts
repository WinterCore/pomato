import React from "react";

export function usePrevious<T>(value: T): React.MutableRefObject<T | undefined>["current"] {
    const ref = React.useRef<T>();

    React.useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current;
}
