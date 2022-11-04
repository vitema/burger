import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import PropTypes from "prop-types";

import { availableTypes } from "../../constants/constants";

const IngredientsGroup = ({ groupType, setCurrent, children }) => {
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

IngredientsGroup.propTypes = {
  groupType: PropTypes.string.isRequired,
  setCurrent: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default IngredientsGroup;
