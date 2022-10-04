import {
  ConstructorElement,
  CurrencyIcon,
  Button,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import Data from "../../utils/data";

const BurgerConstructor = () => {
  //todo remove after realize drag&drop method
  const bun = Data.filter((x) => x._id === "60666c42cc7b410027a1a9b1")[0];
  const ingridients = Data.filter((x) => x.type !== "bun");

  const getSum = () => {
    return (
      ingridients.reduce((sum, item) => sum + item.price, 0) + bun.price * 2
    );
  };

  return (
    <div className={styles.box}>
      <div className="pl-6 pr-6 pb-2">
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${bun.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image}
        />
      </div>
      <div className={styles.itemsBox}>
        {ingridients.map((item) => (
          <div className={styles.ingridientItem} key={item._id}>
            <DragIcon type="primary" />
            <ConstructorElement
              text={item.name}
              price={item.price}
              thumbnail={item.image}
            />
          </div>
        ))}
      </div>
      <div className="pl-6 pr-6 pt-2">
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${bun.name}  (низ)`}
          price={bun.price}
          thumbnail={bun.image}
        />
      </div>
      <div className={styles.footerBox}>
        <span className="text text_type_digits-default p-2">{getSum()} </span>
        <span className="pr-8">
          <CurrencyIcon type="primary" />
        </span>
        <Button type="primary" size="large" htmlType="button">
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};

export default BurgerConstructor;
