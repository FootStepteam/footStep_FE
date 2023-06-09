import ExistsPlan from "./ExistsPlan";
import NotExistsPlan from "./NotExistsPlan";

const PlanListContent = () => {
  const plans = [];
  const isExists = plans.length !== 0;

  return (
    <div className="mt-8 w-commonSection">
      {isExists ? <ExistsPlan /> : <NotExistsPlan />}
    </div>
  );
};

export default PlanListContent;
