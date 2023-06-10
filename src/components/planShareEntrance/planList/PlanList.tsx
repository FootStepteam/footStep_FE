import PlanListContent from "./planContent/PlanListContent";
import PlanListHeader from "./planHeader/PlanListHeader";

const Plan = () => {
  return (
    <div className="w-commonSection h-section m-center">
      <PlanListHeader />
      <PlanListContent />
    </div>
  );
};

export default Plan;
