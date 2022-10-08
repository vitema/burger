import { useEffect } from "react";

const useKeyDown = (keyName, callBack) => {
  const keyDownFucntion = (event) => {
    if (event.key === keyName) {
      callBack();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keyDownFucntion, false);

    return () => {
      document.removeEventListener("keydown", keyDownFucntion, false);
    };
  }, []);
};

export default useKeyDown;
