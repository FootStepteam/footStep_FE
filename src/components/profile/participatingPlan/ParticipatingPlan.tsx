import ExistsParticipatingPlan from "./ExistsParticipatingPlan";
import NotExistsParticipatingPlan from "./NotExistsParticipatingPlan";

const ParticipatingPlan = () => {
  const travelPlans = ["example"];
  const isExists = travelPlans.length !== 0;

  return (
    <div>
      <section className="mt-24 ml-32">
        <h1 className="mb-4 text-xl font-bold tracking-tight">
          참여중인 여행 일정{" "}
          <span className="ml-2 text-blue-003">{travelPlans.length}</span>
        </h1>
        {isExists ? (
          <ExistsParticipatingPlan />
        ) : (
          <NotExistsParticipatingPlan />
        )}
      </section>
    </div>
  );
};

export default ParticipatingPlan;
