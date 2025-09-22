import type React from "react";

import { observer } from "mobx-react-lite";
import Text from "../../components/Text";

import styles from "./CartPage.module.scss";
import rootStore from "../../store/RootStore";
import Card from "../../components/Card";
import Button from "../../components/Button";
import { evalPrice } from "../../utils/evalPrice";
import { ROUTES } from "../../config/routes";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const CartPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <>
            <Text className={styles.title} view="title" tag="h1" weight="bold" align="center">Products</Text>

            {rootStore.cart.items.length === 0 ?
                <div className={styles.no_elements}>
                    <Text view="p-20" color="primary" align="center">There are no items in your cart yet. View them on the product page!</Text>
                    <Button onClick={() => navigate(ROUTES.products.get())}>ProductsPage</Button>
                </div>
                :
                <div className={styles.products}>
                    {
                        rootStore.cart.items.map((data, i) => {
                            return <Card
                                key={data.id}
                                image={data.images[0].url}
                                subtitle={data.description}
                                title={data.title}
                                captionSlot={data.productCategory.title}
                                contentSlot={`$${evalPrice(data.price, data.discountPercent).toFixed(2)}`}
                                actionSlot={<Button>Buy now</Button>}
                                onClick={() => navigate(ROUTES.product.get(data.documentId))}
                            />
                        })
                    }
                </div>
            }
        </>
    );
}

export default observer(CartPage);