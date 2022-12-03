import { useRouteMatch } from "react-router-dom";

import Menu from "../components/menu/menu";

import commonStyles from "./page.module.css";

export function FeedOrderPage() {
  type FeedRouteParams = {
    id: string;
  };

  const { params } = useRouteMatch<FeedRouteParams>();

  return (
    <div className={commonStyles.row}>
      <Menu />
      <div className={commonStyles.inputs}>
        <p className="text text_type_main-medium p-6">Заказ {params["id"]}</p>
      </div>
    </div>
  );
}

export default FeedOrderPage;
