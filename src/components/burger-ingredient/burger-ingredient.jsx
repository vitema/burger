import React from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredient.module.css';
import PropTypes from 'prop-types';

const BurgerIngredient = ({ item }) => {

  //todo remove after realize drag&drop method
  const testBunId = '60666c42cc7b410027a1a9b1';
  const [count, setCount] = React.useState(item._id === testBunId ? 1 : 0);

  return (
    <li className={styles.column}>
      <div className={styles.imgBox}><img src={item.image} />
        {count > 0 && <Counter count={count} size="default" />}
      </div>

      <div className={styles.priceBox}>
        <span className="text text_type_digits-default mt-1 mb-1 pr-2">{item.price}</span>
        <CurrencyIcon type="primary" />
      </div>

      <div className={styles.textBox}><p className="text text_type_main-small">{item.name}</p></div>
    </li>
  )
}

const itemPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  image: PropTypes.string,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
});

BurgerIngredient.propTypes = {
  item: itemPropTypes.isRequired
};

export default BurgerIngredient;