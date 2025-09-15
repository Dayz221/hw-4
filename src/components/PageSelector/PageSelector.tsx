import type React from "react";

import styles from "./PageSelector.module.scss"
import ArrowDownIcon from "../icons/ArrowDownIcon";
import classNames from "classnames";

type PageSelectorParams = {
    page: number,
    cnt_of_pages: number,
    onChange: (page: number) => void,
};

type PageButtonParams = {
    page: number,
    active?: boolean,
    onClick: (page: number) => void,
};

const PageButton: React.FC<PageButtonParams> = ({ page, onClick, active = false }) => {
    return (
        <button onClick={() => onClick(page)} className={classNames(styles.page_button, { [styles.active]: active })}>
            {page}
        </button>
    );
};

const PageSelector: React.FC<PageSelectorParams> = ({ page, cnt_of_pages, onChange }) => {
    const changePageHandler = (newVal: number) => {
        if (newVal > 0 && newVal <= cnt_of_pages) {
            onChange(newVal);
        }
    }

    const mid_page = Math.max(3, Math.min(cnt_of_pages - 2, page));

    return (
        <div className={styles.page_selector}>
            <button className={styles.arrow} disabled={page === 1} onClick={() => changePageHandler(page - 1)}>
                <ArrowDownIcon color={page === 1 ? "secondary" : "primary"} angle={90} />
            </button>

            <div className={styles.pages}>
                {
                    (cnt_of_pages > 5) ?
                        <>
                            <PageButton page={1} active={page === 1} onClick={changePageHandler} />

                            {
                                mid_page === 3 ?
                                    <PageButton page={2} active={page === 2} onClick={changePageHandler} />
                                    :
                                    <div className={styles.ellipses}>...</div>
                            }

                            <PageButton page={mid_page} active={page === mid_page} onClick={changePageHandler} />

                            {
                                mid_page === cnt_of_pages - 2 ?
                                    <PageButton page={cnt_of_pages - 1} active={page === cnt_of_pages - 1} onClick={changePageHandler} />
                                    :
                                    <div className={styles.ellipses}>...</div>

                            }

                            <PageButton page={cnt_of_pages} active={page === cnt_of_pages} onClick={changePageHandler} />
                        </>
                        :
                        Array(cnt_of_pages).fill(0).map((_, i) => {
                            return <PageButton page={i+1} active={page === i+1} key={i} onClick={changePageHandler} />;
                        })
                }
            </div>

            <button className={styles.arrow} disabled={page === cnt_of_pages} onClick={() => changePageHandler(page + 1)}>
                <ArrowDownIcon color={page === cnt_of_pages ? "secondary" : "primary"} angle={-90} />
            </button>
        </div>
    );
};

export default PageSelector;