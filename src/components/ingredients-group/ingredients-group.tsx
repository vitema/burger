import { useInView } from "react-intersection-observer";
import { useEffect, FC, PropsWithChildren } from "react";

import { availableTypes } from "../../constants/constants";

interface IngredientsGroupProps {
  groupType: string;
  setCurrent: (current: string) => void;
}

const IngredientsGroup: FC<PropsWithChildren<IngredientsGroupProps>> = ({
  groupType,
  setCurrent,
  children,
}) => {
  const { ref, inView } = useInView({
    /* Optional options */
    rootMargin: "0px 0px -400px 0px",
    threshold: 0,
  });

  useEffect(() => {
    if (inView) {
      setCurrent(groupType);
    }
  }, [inView, setCurrent, groupType]);

  return (
    <div ref={ref}>
      <p className="text text_type_main-medium mt-10">
        {`${availableTypes[groupType]}`}
      </p>
      {children}
    </div>
  );
};

export default IngredientsGroup;
