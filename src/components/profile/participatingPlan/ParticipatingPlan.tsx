import ExistsParticipatingPlan from "./ExistsParticipatingPlan";
import NotExistsParticipatingPlan from "./NotExistsParticipatingPlan";

const ParticipatingPlan = () => {
  const travelPlans = ["example"];
  const isExists = travelPlans.length !== 0;

  return (
    <div className="grow">
      <section className="mt-12">
        <h1 className="mb-4 text-xl font-bold tracking-tight">
          참여중인 여행 일정
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
