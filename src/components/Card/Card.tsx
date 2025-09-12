import classNames from 'classnames';
import React from 'react';
import Text from '../Text';

import styles from "./card.module.scss"

export type CardProps = {
    /** Дополнительный classname */
    className?: string,
    /** URL изображения */
    image: string;
    /** Слот над заголовком */
    captionSlot?: React.ReactNode;
    /** Заголовок карточки */
    title: React.ReactNode;
    /** Описание карточки */
    subtitle: React.ReactNode;
    /** Содержимое карточки (футер/боковая часть), может быть пустым */
    contentSlot?: React.ReactNode;
    /** Клик на карточку */
    onClick?: React.MouseEventHandler;
    /** Слот для действия */
    actionSlot?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({className, image, captionSlot, title, subtitle, contentSlot, actionSlot, onClick}) => {
    return (
        <div className={classNames(styles.card, className)} onClick={onClick}>
            <div className={styles.card_image}>
                <img src={image} alt="" />
            </div>

            <div className={styles.card_info}>
                <div className={styles.text_side}>
                    { captionSlot && <div className={styles.caption_slot}>{captionSlot}</div> }
                    <Text view='p-20' weight='bold' maxLines={2} >{ title }</Text>
                    <Text view='p-16' maxLines={3} color='secondary' >{ subtitle }</Text>
                </div>

                <div className={styles.action_side}>
                    <div className={styles.content_slot}>{contentSlot}</div>
                    <div>{actionSlot}</div>
                </div>
            </div>
        </div>
    )
};

export default Card;
