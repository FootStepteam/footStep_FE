import PlanListContent from "./planContent/PlanListContent";
import PlanListHeader from "./planHeader/PlanListHeader";

const Plan = () => {
  return (
    <div className="w-commonSection h-section mx-auto my-20">
      <PlanListHeader />
      <PlanListContent />
    </div>
  );
};

export default Plan;
