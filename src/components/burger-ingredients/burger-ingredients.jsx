import React, { useEffect, useCallback, useRef } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";
import Ingridient from "../burger-ingredient/burger-ingredient";
import PropTypes from "prop-types";
import { ingredientType } from "../../utils/types";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import useModal from "../../hooks/useModal";
import { availableTypes, bunType } from "../../constants/constants";
import { useSelector, useDispatch } from "react-redux";
import { getIngredients } from "../../services/actions/ingredients";
import { ADD_INGREDIENT } from "../../services/actions/constructor";

import { useInView } from "react-intersection-observer";
import { InView } from "react-intersection-observer";
import GroupHeader from "../group-header/group-header";

const BurgerIngredients = () => {
  const [current, setCurrent] = React.useState(bunType);
  const [selectedItem, selectItem] = React.useState(null);

  const { modalVisible, handleOpenModal, handleCloseModal } = useModal();
  const [headers, setHeaders] = React.useState({});

  const dispatch = useDispatch();

  const onChange = (key, value) => {
    return;
    let newDict = { ...headers };
    newDict[key] = value;
    setHeaders(newDict);

    debugger;

    if (value.isVisible) {
      Object.keys(newDict).map(function (key) {
        const existsValue = newDict[key];
        if (existsValue.isVisible && existsValue.top < value) {
          debugger;
          setCurrent(key);
          return;
        }
      });

      setCurrent(key);
    }
  };

  useEffect(() => {
    dispatch(getIngredients());
    setCurrent(bunType);
  }, [dispatch]);

  const data = useSelector((store) => store.ingredients.items); // todo можно отработать лоадинг и вывод ошибки заюзать ingredientsRequest, ingredientsFailed заюзать memo где map

 const ref= useRef(null);

  return (
    <div className={styles.box}>
      <p className="text text_type_main-large mt-10">Соберите бургер</p>
      <div className={styles.tabBox}>
        {Object.keys(availableTypes).map((key) => (
          <Tab
            class="mt-5"
            key={key}
            value={key}
            active={current === key}
            onClick={setCurrent}
          >
            {availableTypes[key]}
          </Tab>
        ))}
      </div>

      {data && data.length > 0 && (
        <div className={styles.ingridientsBox} ref={ref}>
       
          {Object.keys(availableTypes).map((key, index) => (
            <React.Fragment key={index}>
             <GroupHeader groupType={key} setCurrent={setCurrent} rootRef={ref}>
              <ul className={styles.row}>
                {data
                  .filter((x) => x.type == key)
                  .map((item) => (
                    <Ingridient
                      key={item._id}
                      item={item}
                      onClick={() => {
                        selectItem(item);
                        handleOpenModal();
                      }}
                    />
                  ))}
              </ul>
              </GroupHeader>

            </React.Fragment>
          ))}
        </div>
      )}
      {modalVisible && (
        <Modal header="Детали ингридиента" onClose={handleCloseModal}>
          <IngredientDetails item={selectedItem} />
        </Modal>
      )}
    </div>
  );
};

// BurgerIngredients.propTypes = {
//   //data: PropTypes.arrayOf(ingredientType).isRequired,
//   addIngredient: PropTypes.func.isRequired,
//   addIngredients: PropTypes.func,
// };

export default BurgerIngredients;
