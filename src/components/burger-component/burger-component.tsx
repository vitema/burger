import { useRef, FC } from "react";
import {useAppDispatch} from "../../hooks/useStore";
import { useDrag, useDrop } from "react-dnd/dist/hooks";

import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-component.module.css";

import { bunType, dndComponentAccept } from "../../constants/constants";

import { DECREMENT_COUNT } from "../../services/actions/ingredients";
import { DELETE_COMPONENT } from "../../services/actions/constructor";
import {IIngredient} from "../../types/ingredients-types";

interface BurgerComponentProps {
  item: IIngredient;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}

const BurgerComponent: FC<BurgerComponentProps> = ({
  item,
  index,
  moveCard,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop({
    // Указываем тип получаемых элементов, чтобы dnd понимал,
    // в какой контейнер можно класть перетаскиваемый элемент, а в какой нельзя.
    // Элементы и контейнеры с разными типами не будут взаимодействовать
    accept: dndComponentAccept,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    // Вызывается, когда перетаскиваемый элемент оказывается над ингредиентом,
    // индекс которого у нас задан в пропсах props.index
    hover(item: any, monitor) {
      if (!ref.current) {
        return;
      }
      // Переопределяем индексы ингредиентов для удобства
      const dragIndex = item.index;
      const hoverIndex = index;
      // Ничего не делаем, если ингредиент находится
      if (dragIndex === hoverIndex) {
        return;
      }
      // Определяем границы карточки ингредиента
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Определяем середину карточки по оси Y нашего ингредиента
      // В момент пересечения этой границы, перетаскиваемым ингредиентом
      // Мы будем менять их местами
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Получаем текущую позицию курсора,
      // относительно текущего контейнера
      const clientOffset = monitor.getClientOffset();
      // Вычисляем координаты курсора и координаты середины карточки
      // на которую мы навели наш перетаскиваемый ингредиент
      let hoverClientY = 0;
      if (clientOffset?.y) {
        hoverClientY = clientOffset.y - hoverBoundingRect.top;
      }
      // Условие для перетаскивании элементов сверху вниз
      // Если перетаскиваемый ингредиент пересекает середину
      // текущего ингредиента, то мы идем дальше и выполняем moveCard
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Условие для перетаскивании элементов снизу вверх
      // Происходит тоже самое что и выше, только в обратном порядке
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Выполняем наш коллбэк с перемещением карточек внутри массива
      moveCard(dragIndex, hoverIndex);
      // Это сделано для внутренней оптимизации библиотеки
      // для поиска и замены элементом
      item.index = hoverIndex;
    },
  });
  // Задаем функционал перетаскивания для элементов внутри списка
  // ингредиентов заказа
  const [{ isDragging }, drag] = useDrag({
    type: dndComponentAccept,
    item: () => ({ dragId: item.dragId, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  // Добавляем перетаскиваемому элементу прозрачность 0,
  // чтобы на его месте визуально появилось пустое пространство
  const opacity = isDragging ? 0 : 1;
  // Тут мы говорим что наш элемент и перетаскиваемый и бросаемый
  if (item.type !== bunType) drag(drop(ref));
  // Прерываем базовую функция для onDrop
  // потому что браузер по умолчанию не сбрасывает наш элемент в контейнер
  const preventDefault = (e: { preventDefault: () => any }) =>
    e.preventDefault();

  const dispatch = useAppDispatch();

  return (
    <div
      className={styles.ingridientItem}
      ref={ref}
      style={{ opacity }}
      onDrop={preventDefault}
      data-handler-id={handlerId}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => {
          dispatch({ type: DECREMENT_COUNT, id: item._id, ingredients: [] });
          dispatch({ type: DELETE_COMPONENT, id: item.dragId as string, components:[] });
        }}
      />
    </div>
  );
};
export default BurgerComponent;
