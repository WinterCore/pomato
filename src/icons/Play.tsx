import {ISVGIconProps, SVGIcon} from "./SVGIcon";

export const PlayIcon: React.FC<ISVGIconProps> = (props) => {
    return (
        <SVGIcon xmlns="http://www.w3.org/2000/svg"
                 xmlnsXlink="http://www.w3.org/1999/xlink"
                 version="1.1"
                 viewBox="0 0 139 139"
                 xmlSpace="preserve"
                 {...props}>
            <path d="M117.037,61.441L36.333,14.846c-2.467-1.424-5.502-1.424-7.972,0c-2.463,1.423-3.982,4.056-3.982,6.903v93.188  c0,2.848,1.522,5.479,3.982,6.9c1.236,0.713,2.61,1.067,3.986,1.067c1.374,0,2.751-0.354,3.983-1.067l80.704-46.594  c2.466-1.422,3.984-4.054,3.984-6.9C121.023,65.497,119.502,62.866,117.037,61.441z"/>
         </SVGIcon>
    );
};
