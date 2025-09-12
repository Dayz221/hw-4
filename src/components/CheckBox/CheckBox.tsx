import classNames from 'classnames';
import React from 'react';

import styles from "./checkbox.module.scss"

export type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  /** Вызывается при клике на чекбокс */
  onChange: (checked: boolean) => void;
};

const CheckBox: React.FC<CheckBoxProps> = ({onChange, className, disabled, checked, ...props}) => {
  return (
    <div className={classNames(styles.checkbox_container, className, {[styles.disabled]: disabled, [styles.checked]: checked})}>
      <input className={styles.checkbox} checked={checked} type="checkbox" disabled={disabled} onChange={(e) => onChange(e.target.checked)} {...props} />
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.6665 19.3552L16.4624 30.0003L33.3332 11.667" stroke="#518581" strokeWidth="3.33333"/>
      </svg>
    </div>
  )
};

export default CheckBox;
