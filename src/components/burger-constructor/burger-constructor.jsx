import React, { useState } from 'react';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import Data from '../../utils/data';

const BurgerConstructor = () => {

  const bun = Data.filter(x => x._id === '60666c42cc7b410027a1a9b1')[0];
  const ingridients = Data.filter(x => x.type !== 'bun');


  const getSum = () => {
    return ingridients.reduce((a, b) => a + b.price, 0) + bun.price * 2;
  }


  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${bun.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image}
        />
        {
          ingridients.map(item => (
            <ConstructorElement key={item._id}
              text={item.name}
              price={item.price}
              thumbnail={item.image}
            />
          ))
        }
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${bun.name}  (низ)`}
          price={bun.price}
          thumbnail={bun.image}
        />
        <p className="text text_type_digits-default">{getSum()} <CurrencyIcon type="primary" /></p>
        <Button type="primary" size="large">Оформить заказ</Button>
      </div>


    </>
  )
}
export default BurgerConstructor;