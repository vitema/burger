import commonStyles from "./page.module.css";
import FeedOrder from "../components/feed-order/feed-order";

export function FeedOrderPage() {
  return (
    <div className={commonStyles.row}>
      <FeedOrder></FeedOrder>
    </div>
  );
}

export default FeedOrderPage;
