import PlanListContent from "./PlanListContent";
import PlanListHeader from "./PlanListHeader";

const Plan = () => {
  return (
    <div className="w-commonSection min-h-section mx-auto my-20">
      <PlanListHeader />
      <PlanListContent />
    </div>
  );
};

export default Plan;
