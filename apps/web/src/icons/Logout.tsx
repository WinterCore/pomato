import React from "react";
import {SVGIcon, ISVGIconProps} from "./SVGIcon.js";

export const LogoutIcon: React.FC<ISVGIconProps> = (props) => {
    return (
        <SVGIcon {...props} aria-hidden="true" viewBox="0 0 24 24">
            <path d="m17 7-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
        </SVGIcon>
    );
};