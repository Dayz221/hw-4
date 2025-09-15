import type React from "react";
import { useNavigate, useParams } from "react-router";
import { fetchProduct, type ProductCard } from "../../api/Strapi/Products";
import { useEffect, useState } from "react";

import styles from "./ProductPage.module.scss";
import ArrowDownIcon from "../../components/icons/ArrowDownIcon";
import Text from "../../components/Text";
import ImageSlider from "../../components/ImageSlider";
import { evalPrice } from "../../utils/evalPrice";
import Button from "../../components/Button";
import Card from "../../components/Card";

const ProductPage: React.FC = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<ProductCard | null>(null);
    const navigate = useNavigate();

    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 1024);

    useEffect(() => {
        const onResize = () => {
            setIsMobile(window.innerWidth <= 1024);
        }

        window.addEventListener("resize", onResize);

        return () => window.removeEventListener("resize", onResize);
    }, [])

    const related_items: ProductCard[] = JSON.parse(localStorage.getItem("related_items") || "[]");

    if (!id) {
        navigate("/products");
        return;
    }

    useEffect(() => {
        fetchProduct(id)
            .then(res => {
                setProduct(res);
                console.log(res);
            })
    }, [id])

    return (
        <>
            <button className={styles.back_button} onClick={() => navigate(-1)}>
                <ArrowDownIcon angle={90} />
                <Text className={styles.back_button_text} view="p-20">Back</Text>
            </button>

            {product &&
                <div className={styles.product}>
                    <ImageSlider images={product.images} />
                    <div className={styles.product_info}>
                        <Text tag="h1" className={styles.title} view="title" maxLines={2} weight="bold">{product.title}</Text>
                        <Text className={styles.description} view="p-20" maxLines={4} color="secondary">{product.description}</Text>
                        <Text className={styles.price} view="title" weight="bold">${evalPrice(product.price, product.discountPercent).toFixed(2)}</Text>

                        <div className={styles.actions}>
                            <Button>Buy now</Button>
                            <Button color="secondary">Add to Cart</Button>
                        </div>
                    </div>
                </div>
            }

            <Text view="p-32" weight="bold" className={styles.related_items_title}>Related Items</Text>

            <div className={styles.related_items}>
                {
                    related_items.reverse().map((data, i) => {
                        if (i === 3 || (isMobile && i == 2))
                            return;

                        return <Card
                            key={data.id}
                            image={data.images[0].url}
                            subtitle={data.description}
                            title={data.title}
                            captionSlot={data.productCategory.title}
                            contentSlot={`$${evalPrice(data.price, data.discountPercent).toFixed(2)}`}
                            actionSlot={<Button>Add to Cart</Button>}
                            onClick={() => navigate(`/product/${data.documentId}`)}
                        />
                    })
                }
            </div>
        </>
    )
}

export default ProductPage;
