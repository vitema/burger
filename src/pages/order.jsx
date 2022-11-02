import {
  useRouteMatch,
} from "react-router-dom";

import AppHeader from "../components/app-header/app-header";
import Menu from "../components/menu/menu";

import commonStyles from "./page.module.css";

export function OrderPage() {

  const { params } = useRouteMatch();

  return (
    <>
      <AppHeader />
      <div className={commonStyles.row}>
        <Menu />
        <div className={commonStyles.inputs}>
          <p className="text text_type_main-medium p-6">Заказ {params["id"]}</p>

        </div>
      </div>
    </>
  );
}

export default OrderPage;
