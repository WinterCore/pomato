import {ISVGIconProps, SVGIcon} from "./SVGIcon.js";

export const Loader: React.FC<ISVGIconProps> = (props) => {
    return (
        <SVGIcon {...props} viewBox="0 0 100 100">
            <circle cx="10" cy="50" r="10">
                <animate
                  attributeName="opacity"
                  dur="1s"
                  values="0;1;0"
                  repeatCount="indefinite"
                  begin="0.1"/>    
            </circle>
            <circle cx="40" cy="50" r="10">
                <animate
                  attributeName="opacity"
                  dur="1s"
                  values="0;1;0"
                  repeatCount="indefinite" 
                  begin="0.2"/>       
            </circle>
            <circle cx="70" cy="50" r="10">
                <animate
                  attributeName="opacity"
                  dur="1s"
                  values="0;1;0"
                  repeatCount="indefinite" 
                  begin="0.3"/>     
            </circle>
        </SVGIcon>
    );
};
