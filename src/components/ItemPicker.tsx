import React, {HTMLAttributes} from "react";
import styled from "@emotion/styled";
import {IRecordWithLabel} from "../types/common";

interface IItemPickerProps<T extends IRecordWithLabel> extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
    readonly selected: T["key"];
    readonly onChange: (item: T) => void;
    readonly items: ReadonlyArray<T>;
}

export const ItemPicker = <T extends IRecordWithLabel>(props: IItemPickerProps<T>): React.ReactElement => {
    const { selected, onChange, items, ...restProps } = props;

    const [height, setHeight] = React.useState<number | "auto">("auto");
    const containerRef = React.useRef<HTMLDivElement>(null);

    const selectedIndex = React.useMemo(() =>
        items.findIndex(({ key }) => selected === key), [items, selected]);

    const handleChange = (item: T) => () => onChange(item);

    React.useEffect(() => {
        const elem = containerRef.current;

        if (! elem) {
            return;
        }

        const { height } = elem.getBoundingClientRect();
        setHeight(height);

    }, [setHeight, containerRef]);

    const itemHeight = React.useMemo(() =>
        height === "auto" ? "auto" : height / items.length, [items.length, height]);

    return (
        <Container {...restProps} style={{ padding: itemHeight !== "auto" ? `${itemHeight * 2}px 0` : 0 }}>
            <div style={{ position: "relative", height: itemHeight }} ref={containerRef}>
                {height !== "auto" && <Highlight />}

                <ItemsContainer style={{ transform: `translateY(calc(100% / 3 * ${selectedIndex} * -1))` }}>
                    {items.map((item, i) =>
                        <Item className={selectedIndex === i ? "active" : ""}
                              onClick={handleChange(item)}
                              key={item.key}>
                            {item.label}
                        </Item>
                    )}
                </ItemsContainer>
            </div>
        </Container>
    );
};

const Item = styled.div`
    padding: 14px 20px;
    border-radius: 9999px;
    font-size: 14px;
    text-align: center;
    cursor: pointer;
    font-weight: bold;
    user-select: none;
`;

const ItemsContainer = styled.div`
    position: relative;
    z-index: 4;
    transition: transform 200ms ease-in-out;


    & > div {
        transition: opacity 140ms linear;
        opacity: 0;
    }

    &:hover > div {
        opacity: 1;
    }

    & > div.active {
        color: ${({ theme }) => theme.C200};
        opacity: 1
    }
`;

const Container = styled.div`
    color: ${({ theme }) => theme.C400};
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Highlight = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 9999px;
    height: 100%;
    width: 100%;
    background: ${({ theme }) => theme.C800};
`;
