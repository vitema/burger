import commonStyles from "./page.module.css";
import FeedOrder from "../components/feed-order/feed-order";

export function OrderPage() {
  return (
    <div className={commonStyles.row}>
      <FeedOrder></FeedOrder>
    </div>
  );
}

export default OrderPage;