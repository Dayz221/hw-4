import type React from "react";
import Text from "../../components/Text";

import styles from "./Products.module.scss";
import Input from "../../components/Input";
import { useEffect, useState } from "react";
import Button from "../../components/Button";
import MultiDropdown, { type Option } from "../../components/MultiDropdown";
import { fetchProducts, type PaginationInfo, type ProductCard } from "../../api/Strapi/Products";
import Card from "../../components/Card";
import { useNavigate, useParams } from "react-router";
import { evalPrice } from "../../utils/evalPrice";
import PageSelector from "../../components/PageSelector";
import { ROUTES } from "../../config/routes";

const ProductsPage: React.FC = () => {
    const [searchFilter, setSearchFilter] = useState<string>("");
    const navigate = useNavigate();

    const allOptions: Option[] = [
        {
            key: "1",
            value: "Chairs",
        },
        {
            key: "2",
            value: "Tables",
        },
        {
            key: "3",
            value: "Mirrors",
        },
        {
            key: "4",
            value: "Vases",
        },
    ]

    const [filters, setFilters] = useState<Option[]>([]);
    const getDropdownTitle = (values: Option[]) => values.length === 0 ? "Filter" : values.map(el => el.value).join(", ");

    const [cards, setCards] = useState<ProductCard[]>([])
    const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>({ page: 0, pageCount: 0, pageSize: 0, total: 0 });
    const { page } = useParams();

    useEffect(() => {
        fetchProducts((!page) ? 1 : +page, 8)
            .then(res => {
                setCards(res.data);
                setPaginationInfo(res.pagination);
            })
    }, [page]);

    const onCardClick = (data: ProductCard) => {
        const related_items: ProductCard[] = JSON.parse(localStorage.getItem("related_items") || "[]");
        if (related_items.find(el => el.id === data.id) === undefined) {
            related_items.push(data);
            if (related_items.length > 3) {
                related_items.splice(0, related_items.length - 3);
            }
            localStorage.setItem("related_items", JSON.stringify(related_items));
        }

        navigate(ROUTES.product.get(data.documentId));
    };

    return (
        <>
            <Text className={styles.title} view="title" tag="h1" weight="bold" align="center">Products</Text>
            <Text className={styles.subtitle} view="p-20" align="center" color="secondary" >
                We display products based on the latest products we have, if you want<br />
                to see our old products please enter the name of the item
            </Text>

            <div className={styles.controls}>
                <div className={styles.find_block}>
                    <Input placeholder="Search product" value={searchFilter} onChange={setSearchFilter} />
                    <Button>Find now</Button>
                </div>

                <div className={styles.filters_block}>
                    <MultiDropdown
                        options={allOptions}
                        getTitle={getDropdownTitle}
                        value={filters}
                        onChange={setFilters}
                    />
                </div>
            </div>

            <div className={styles.total_products}>
                <Text view="p-32" weight="bold">Total products</Text>
                <Text view="p-20" color="accent" weight="bold">{paginationInfo.total}</Text>
            </div>

            <div className={styles.products}>
                {
                    cards?.map(data => {
                        return <Card
                            key={data.id}
                            image={data.images[0].url}
                            subtitle={data.description}
                            title={data.title}
                            captionSlot={data.productCategory.title}
                            contentSlot={`$${evalPrice(data.price, data.discountPercent).toFixed(2)}`}
                            actionSlot={<Button>Add to Cart</Button>}
                            onClick={() => onCardClick(data)}
                        />
                    })
                }
            </div>

            <div className={styles.pagination}>
                <PageSelector page={!page ? 1 : +page} cntOfPages={paginationInfo.pageCount} onChange={(p) => navigate(`/products/${p}`)} />
            </div>
        </>
    )
}

export default ProductsPage;