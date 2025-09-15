import type React from "react";
import type { ProductCardImage } from "../../api/Strapi/Products";

import styles from "./ImageSlider.module.scss";
import { useState } from "react";
import ArrowDownIcon from "../icons/ArrowDownIcon";
import Image from "../Image/Image";

type ImageSliderProps = {
    width?: string;
    height?: string;
    images: ProductCardImage[];
};

const ImageSlider: React.FC<ImageSliderProps> = ({width="100%", height="100%", images}) => {
    const [curImage, setCurImage] = useState<number>(0);
    
    return (
        <div className={styles.image_slider} style={{width, height}}>
            <button className={styles.left_arrow} disabled={curImage <= 0} onClick={() => setCurImage(prev => prev - 1)}>
                <ArrowDownIcon angle={90} color="light" />
            </button>
            
            <div className={styles.images} style={{transform: `translateX(-${(100/images.length) * curImage}%)`, width: `${100 * images.length}%`}}>
                {
                    images.map(data => <Image className={styles.image} src={data.url} key={data.url} />)
                }
            </div>

            <button className={styles.right_arrow} disabled={curImage >= images.length - 1} onClick={() => setCurImage(prev => prev + 1)}>
                <ArrowDownIcon angle={-90} color="light" />
            </button>
        </div>
    )
};

export default ImageSlider;