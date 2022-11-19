import { useEffect } from "react";

const useKeyDown = (keyName: string, callBack: () => void) => {
  const keyDownFucntion = (event: { key: any; }): void => {
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
