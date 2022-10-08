import { useEffect } from "react";

const useKeyDown = (keyName, fn) => {
  const keyDownFucntion = (event) => {
    if (event.key === keyName) {
      fn();
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
