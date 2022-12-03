import { NavLink } from "react-router-dom";
import { HTML5Backend } from "react-dnd-html5-backend";
import Menu from "../components/menu/menu";
import { DndProvider } from "react-dnd";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import { useAppDispatch, useAppSelector } from "../hooks/useStore";
import commonStyles from "./page.module.css";
import FeedOrders from "../components/feed-orders/feed-orders";
import FeedTotal from "../components/feed-total/feed-total";

export function FeedPage() {
  const { feed } = useAppSelector((store) => ({
    feed: store.feed.feed,
  }));

  const data=feed?.orders;

  const { ingredients } = useAppSelector((store) => ({
    ingredients: store.ingredients.items,
  }));


  return (
      <div className={commonStyles.row}>
      <div className={commonStyles.row}>
        <FeedOrders feed={feed} ingredients={ingredients} />
        <FeedTotal feed={feed} ingredients={ingredients} />
      </div>
      </div>
  );
}

export default FeedPage;
