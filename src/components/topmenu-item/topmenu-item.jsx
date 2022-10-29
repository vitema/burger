import { NavLink, useRouteMatch } from "react-router-dom";
import {
  BurgerIcon,
  ListIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./topmenu-item.module.css";

const TopMenuItem = ({ text, to, icon }) => {
  const match = useRouteMatch(to);

  let type = "secondary";
  let className = "text text_type_main-small pl-2 text_color_inactive pl-2";

  if (match?.isExact) {
    type = "primary";
    className = "text text_type_main-small pl-2";
  }

  return (
    <>
      {icon == "burger" ? (
        <BurgerIcon type={type}></BurgerIcon>
      ) : (
        <ListIcon type={type}></ListIcon>
      )}
      <NavLink
        to={{ pathname: `${to}` }}
        className={styles.link}
        activeClassName={styles.active}
      >
        <span className={className}>{text}</span>
      </NavLink>
    </>
  );
};

export default TopMenuItem;
