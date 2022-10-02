import React from 'react';
import { Logo, BurgerIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyles from './header.module.css';

class AppHeader extends React.Component {
  render() {
    return (
      <div className={headerStyles.box}>
        <div className={headerStyles.menuLeft}>

          <div className={headerStyles.menuItem}>
            <BurgerIcon type="primary"></BurgerIcon>
            <span className="text text_type_main-small pl-2">Конструктор</span>
          </div>
          <div className={headerStyles.menuItem}>
            <ListIcon type="secondary" />
            <span className="text text_type_main-small text_color_inactive pl-2">Лента заказов</span>
          </div>
        </div>

        <div className={headerStyles.logo}> <Logo /></div>

        <div className={headerStyles.menuRight}>
          <div className={headerStyles.menuItem}>
            <BurgerIcon type="secondary"></BurgerIcon>
            <span className="text text_type_main-small text_color_inactive pl-2">Личный кабинет</span>
          </div>
        </div>
      </div>
    )
  }
}

export default AppHeader;