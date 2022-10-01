import React from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyles from './header.module.css';

class AppHeader extends React.Component {
  render() {
    return (
      <nav className={headerStyles.box}>
        <div className={headerStyles.menuLeft}>
          <BurgerIcon type="primary" /><p className="text text_type_main-small m-1">Конструктор</p>
          <ListIcon type="primary" /><p className="text text_type_main-small m-1">Лента заказов</p>
          
        </div>
        <div className={headerStyles.logo}> <Logo /></div>

        <div className={headerStyles.menuRight}>
          <ProfileIcon type="primary" /><p className="text text_type_main-small m-1">Личный кабинет</p>
        </div>
      </nav>
    )
  }
}

export default AppHeader;