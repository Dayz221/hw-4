import type React from "react";

import { Link, useLocation } from "react-router";
import BasketIcon from "../icons/BasketIcon";
import AccountIcon from "../icons/AccountIcon";
import Text from "../Text";

import styles from "./Header.module.scss";
import classNames from "classnames";

type MenuItemProps = {
    path: string;
    text: string;
};

const MenuItem: React.FC<MenuItemProps> = ({ path, text }) => {
    const location = useLocation()
    const active = location.pathname.startsWith(path)

    return (
        <Link to={path} className={classNames(styles.menu_item, { [styles.active]: active })}>
                < Text view="p-18" color={active ? "accent" : "primary"}>{text}</Text>
        </Link >
    );
}

const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <img src="/Logo.svg" alt="" />

            <menu className={styles.menu}>
                <MenuItem path="/products" text="Products" />
                <MenuItem path="/categories" text="Categories" />
                <MenuItem path="/about_us" text="About us" />
            </menu>

            <div className={styles.user_controls}>
                <Link to="/basket">
                    <BasketIcon />
                </Link>
                <Link to="/account">
                    <AccountIcon />
                </Link>
            </div>
        </header>
    );
};

export default Header;