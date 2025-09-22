import type React from "react";
import Text from "../../components/Text";

import styles from "./Products.module.scss";
import Input from "../../components/Input";
import { useEffect, useState } from "react";
import Button from "../../components/Button";
import MultiDropdown, { type Option } from "../../components/MultiDropdown";
import Card from "../../components/Card";
import { useLocation, useNavigate } from "react-router";
import { evalPrice } from "../../utils/evalPrice";
import PageSelector from "../../components/PageSelector";
import { ROUTES } from "../../config/routes";
import ProductsStore from "../../store/ProductsStore";
import type { ProductCardModel } from "../../store/models/products/ProductCard";
import qs from "qs";
import { useLocalStore } from "../../store/useLocalStore/useLocalStore";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import rootStore from "../../store/RootStore";
import { Meta } from "../../utils/meta";
import Loader from "../../components/Loader";

const ProductsPage: React.FC = () => {
    const productsStore = useLocalStore(() => new ProductsStore());
    const navigate = useNavigate();
    const location = useLocation();

    const [search, setSearch] = useState("");
    const [categories, setCategories] = useState<Option[]>([]);

    useEffect(() => {
        const parsed = qs.parse(location.search.slice(1));
        setSearch(parsed.search as string || "");
        setCategories(parsed.categories as Option[] || []);
    }, []);

    useEffect(() => {
        productsStore.fetchCategories();
    }, [])

    useEffect(() => {
        productsStore.fetchProducts();
    }, [rootStore.query.getParam("page"), rootStore.query.getParam("categories"), rootStore.query.getParam("search")])

    const getDropdownTitle = (values: Option[]) => values.length === 0 ? "Filter" : values.map(el => el.value).join(", ");

    const onCardClick = (data: ProductCardModel) => {
        navigate(ROUTES.product.get(data.documentId));

        const relatedItems = JSON.parse(localStorage.getItem("related_items") || "[]");
        if (relatedItems.find((item: ProductCardModel) => item.id === data.id)) {
            return;
        }
        if (relatedItems.length === 3) {
            relatedItems.shift();
        }
        relatedItems.push(data);
        localStorage.setItem("related_items", JSON.stringify(relatedItems));
    };

    const onPageChange = (newPage: number) => {
        const prevQuery = qs.parse(location.search.slice(1));
        const newQuery = { ...prevQuery, page: newPage };
        navigate({
            pathname: location.pathname,
            search: qs.stringify(newQuery),
        });
    }

    const onSearchClick = () => {
        navigate({
            pathname: location.pathname,
            search: qs.stringify({ ...qs.parse(location.search.slice(1)), search: search, categories: categories }),
        });
    }

    const onSearchChange = (newSearch: string) => {
        setSearch(newSearch);
    }

    const onCategoriesChange = (newCategories: Option[]) => {
        setCategories(newCategories);
    }

    return (
        <>
            <Text className={styles.title} view="title" tag="h1" weight="bold" align="center">Products</Text>
            <Text className={styles.subtitle} view="p-20" align="center" color="secondary" >
                We display products based on the latest products we have, if you want<br />
                to see our old products please enter the name of the item
            </Text>

            <div className={styles.controls}>
                <div className={styles.find_block}>
                    <Input placeholder="Search product" value={search} onChange={onSearchChange} />
                    <Button onClick={onSearchClick}>Find now</Button>
                </div>

                <div className={styles.filters_block}>
                    <MultiDropdown
                        options={toJS(productsStore.categories)}
                        getTitle={getDropdownTitle}
                        value={categories}
                        onChange={onCategoriesChange}
                    />
                </div>
            </div>


            {productsStore.meta === Meta.loading && <div className={styles.loader_container}><Loader /></div>}

            {
                productsStore.meta === Meta.success &&
                <>
                    <div className={styles.total_products}>
                        <Text view="p-32" weight="bold">Total products</Text>
                        <Text view="p-20" color="accent" weight="bold">{productsStore.pagination.total}</Text>
                    </div>
                    <div className={styles.products}>
                        {
                            productsStore.products.map(data => {
                                const onCart = rootStore.cart.checkInCart(data);

                                return <Card
                                    key={data.id}
                                    image={data.images[0].url}
                                    subtitle={data.description}
                                    title={data.title}
                                    captionSlot={data.productCategory.title}
                                    contentSlot={`$${evalPrice(data.price, data.discountPercent).toFixed(2)}`}
                                    actionSlot={<Button onClick={() => rootStore.cart.addItem(data)}>{onCart ? "On Cart!" : "Add to Cart"}</Button>}
                                    onClick={() => onCardClick(data)}
                                />
                            })
                        }
                    </div>

                    <div className={styles.pagination}>
                        <PageSelector page={productsStore.pagination.page} cntOfPages={productsStore.pagination.pageCount} onChange={onPageChange} />
                    </div>
                </>
            }
        </>
    )
}

export default observer(ProductsPage);