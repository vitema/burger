import { NavLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import {
  BurgerIcon,
  ListIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./topmenu-item.module.css";

const TopMenuItem = ({ text, to, icon }) => {
  let type = "secondary";
  let className = "text text_type_main-small pl-2 text_color_inactive pl-2";
  const location = useLocation();

  if (to) {
    let isMatch = false;
    if (to === "/") {
      isMatch = location.pathname === to;
    } else {
      isMatch = location.pathname.includes(to);
    }

    if (isMatch) {
      type = "primary";
      className = "text text_type_main-small pl-2";
    }
  }
  return (
    <>
      {icon === "burger" ? (
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

TopMenuItem.propTypes = {
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default TopMenuItem;
