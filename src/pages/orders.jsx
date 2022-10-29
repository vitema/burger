import { NavLink } from "react-router-dom";

import AppHeader from "../components/app-header/app-header";
import Menu from "../components/menu/menu";

import commonStyles from "./page.module.css";

export function OrdersPage() {
  return (
    <>
      <AppHeader />
      <div className={commonStyles.row}>
        <Menu />
        <div className={commonStyles.inputs}>
          <p className="text text_type_main-medium p-6">Заказы</p>

          <NavLink to={{ pathname: `/profile/orders/1` }}>Заказ</NavLink>
        </div>
      </div>
    </>
  );
}

export default OrdersPage;
