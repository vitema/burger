import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { InView } from "react-intersection-observer";
import { availableTypes } from "../../constants/constants";
import { bunType } from "../../constants/constants";

const GroupHeader = ({ groupType, setCurrent, children }) => {
  const { ref, inView } = useInView({
    /* Optional options */
    rootMargin:"0px 0px -400px 0px",
    threshold: 0,
  });

  useEffect(() => {
    if (inView){
      setCurrent(groupType);
    }
   
  }, [inView]);

  return (
    <div ref={ref}>
      <p className="text text_type_main-medium mt-10">
        {`${availableTypes[groupType]}`}
      </p>
      {children}
    </div>
  );
};

export default GroupHeader;
