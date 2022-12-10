import { Link } from "react-router-dom";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyles from "./header.module.css";

import TopMenuItem from "../topmenu-item/topmenu-item";

const AppHeader = () => {
  return (
    <header className={headerStyles.box}>
      <div className={headerStyles.menuLeft}>
        <div className={headerStyles.menuItem}>
          <TopMenuItem to={"/"} text={"Конструктор"} icon={"burger"} />
        </div>
        <div className={headerStyles.menuItem}>
          <TopMenuItem to={"/feed"} text={"Лента заказов"} icon={"list"} />
        </div>
      </div>

      <div className={headerStyles.logo}>
        <Link to={{ pathname: "/" }}>
          <Logo />
        </Link>
      </div>

      <div className={headerStyles.menuRight}>
        <div className={headerStyles.menuItem}>
          <TopMenuItem
            to={"/profile"}
            text={"Личный кабинет"}
            icon={"burger"}
          />
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
