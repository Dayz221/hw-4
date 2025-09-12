import classNames from "classnames";
import type React from "react";

import styles from "./Image.module.scss";

type ImageProperies = HTMLImageElement & {
    src: string,
    className?: string
};

const Image: React.FC<ImageProperies> = ({src, className, ...props}) => {
    return (
        <img className={classNames(styles.image, className)} src={src} {...props}/>
    )
}

export default Image;