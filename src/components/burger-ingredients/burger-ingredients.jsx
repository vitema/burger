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

  const [current, setCurrent] = React.useState('bun')

  return (
    <section>

      <p className="text text_type_main-large">Соберите бургер</p>
      <div className={styles.tabBox}>
        {Object.keys(availableTypes).map((key, index) => (
          <Tab key = {key} value={key} active={current === key} onClick={setCurrent}>{availableTypes[key]}</Tab>
        ))}
      </div>

      <div>
        {
          Object.keys(availableTypes).map((key, index) => (
            <Ingridient key={index} type={availableTypes[key]} data={props.data.filter(x => x.type == key)} />
          ))
        }

      </div>
    </section>
  )
}

export default BurgerIngredients;