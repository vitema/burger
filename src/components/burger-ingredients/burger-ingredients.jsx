import React from 'react';
import { Tab, Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import Ingridient from '../burger-ingredient/burger-ingredient';


const BurgerIngredients = (props) => {

  const availableTypes = {
    "bun": "Булки",
    "sauce": "Соус",
    "main": "Начинки"
  }

  const [current, setCurrent] = React.useState('bun');
  return (
    <div className={styles.box}>
      <p className="text text_type_main-large mt-10">Соберите бургер</p>
      <div className={styles.tabBox}>
        {Object.keys(availableTypes).map((key) => (
          <Tab class="mt-5" key={key} value={key} active={current === key} onClick={setCurrent}>{availableTypes[key]}</Tab>
        ))}
      </div>

      <div className={styles.ingridientsBox}>
        {
          Object.keys(availableTypes).map((key, index) => (
            <React.Fragment key={index}>
              <p className="text text_type_main-medium mt-10">{availableTypes[key]}</p>
              <ul className={styles.row}>
                {
                  props.data.filter(x => x.type == key).map(item => (
                    <Ingridient key={item._id} item={item} />
                  ))}
              </ul>
            </React.Fragment>
          ))
        }
      </div>
    </div>
  )
}

export default BurgerIngredients;