import type React from "react";

import { Link, useLocation } from "react-router";
import BasketIcon from "../icons/BasketIcon";
import AccountIcon from "../icons/AccountIcon";
import Text from "../Text";

import styles from "./Header.module.scss";
import classNames from "classnames";
import { useEffect, useState } from "react";

type MenuItemProps = {
    path: string;
    text: string;
    onClick?: () => void,
};

const MenuItem: React.FC<MenuItemProps> = ({ path, text, onClick }) => {
    const location = useLocation()
    const active = location.pathname.startsWith(path)

    return (
        <Link to={path} onClick={onClick} className={classNames(styles.menu_item, { [styles.active]: active })}>
            < Text view="p-18" color={active ? "accent" : "primary"}>{text}</Text>
        </Link >
    );
}

const Header: React.FC = () => {
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        const onResize = () => {
            setIsMobile(window.innerWidth <= 768);
        }

        window.addEventListener("resize", onResize);

        return () => window.removeEventListener("resize", onResize);
    }, [])

    const headerContent = (
        <>
            <menu className={styles.menu}>
                <MenuItem path="/products" text="Products" onClick={() => setIsOpen(false)} />
                <MenuItem path="/categories" text="Categories" onClick={() => setIsOpen(false)} />
                <MenuItem path="/about_us" text="About us" onClick={() => setIsOpen(false)} />
            </menu>

            <div className={styles.user_controls}>
                <Link to="/basket" onClick={() => setIsOpen(false)}>
                    <BasketIcon />
                </Link>
                <Link to="/account" onClick={() => setIsOpen(false)}>
                    <AccountIcon />
                </Link>
            </div>
        </>
    );

    return (
        <>
            <header className={styles.header}>
                <img src="/Logo.svg" alt="" />

                {!isMobile && headerContent}

                {isMobile &&
                    <div className={styles.menu_icon} onClick={() => setIsOpen(true)}>
                        <div />
                        <div />
                        <div />
                    </div>
                }
            </header>

            {isMobile &&
                <div className={classNames(styles.mobile_menu, { [styles.active]: isOpen })}>
                    <div className={styles.close} onClick={() => setIsOpen(false)}>
                        <div />
                        <div />
                    </div>
                    {headerContent}
                </div>
            }
        </>
    );
};

export default Header;