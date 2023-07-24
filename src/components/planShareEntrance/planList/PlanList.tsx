import PlanListContent from "./PlanListContent";
import PlanListHeader from "./PlanListHeader";

const Plan = () => {
  return (
    <div className="w-full md:w-commonSection min-h-section mx-auto mt-16 mb-32">
      <PlanListHeader />
      <PlanListContent />
    </div>
  );
};

export default Plan;
