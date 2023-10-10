import Start from "./Start";
import Problem from "./Problem";
import Resolve from "./Resolve";
import Step from "./Step";
import { useEffect } from "react";
import { useCheckOpenToggle } from "../../hooks/useCheckOpenToggle";

const Content = () => {
  const { checkOpenToggle } = useCheckOpenToggle();

  useEffect(() => {
    checkOpenToggle();
  }, []);

  return (
    <>
      <Start />
      <Problem />
      <Resolve />
      <Step />
    </>
  );
};

export default Content;
