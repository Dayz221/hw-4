import classNames from "classnames";
import type React from "react";

import styles from "./Image.module.scss";
import { useState } from "react";
import Loader from "../Loader";

type ImageProperies = {
    src: string,
    className?: string
    width?: string;
    height?: string;
};

const Image: React.FC<ImageProperies> = ({ width = "100%", height = "100%", src, className, ...props }) => {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    return (
        <>
            <div style={{width, height}}>
                <img
                    className={classNames(styles.image, className)}
                    onLoad={() => setLoading(false)}
                    onError={() => setError(true)}
                    style={{ display: (loading || error) ? "none" : "block" }}
                    src={src}
                    {...props}
                />

                { (loading || error) && <div className={styles.loader}> <Loader /> </div> }
            </div>


        </>
    )
}

export default Image;