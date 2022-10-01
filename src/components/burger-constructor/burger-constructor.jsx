import React from 'react';
import { Logo, CurrencyIcon, DeleteIcon , ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';

const BurgerConstructor = ({ data }) => {

  return (
    <ul className={styles.row1}>
      {
        data.map(item => (
          <li className={styles.liRow}>
            <img src={item.image_mobile} />
            <p className="text text_type_main-small">{item.name}</p>
            <p className="text text_type_digits-default">{item.price} <CurrencyIcon type="primary" /><DeleteIcon type="primary" /></p>
          </li>
        ))
      }
    </ul>
  )
}
export default BurgerConstructor;