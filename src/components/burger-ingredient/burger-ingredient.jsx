import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredient.module.css';


const BurgerIngredient = ({type, data}) => {

  return (
      <>
        <p className="text text_type_main-medium">{type}</p>
        <ul className={styles.row}>
          {
            data.map(item => (
              <li key={item._id} className={styles.column}>
                <img src={item.image} />
                <p className="text text_type_digits-default">{item.price} <CurrencyIcon type="primary" /></p>
                <p className="text text_type_main-small">{item.name}</p>
                </li>
            ))}
        </ul>
      </>
  )
}

export default BurgerIngredient;