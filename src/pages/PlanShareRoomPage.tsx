import PlanShareRoom from "../components/planShareRoom/PlanShareRoom";
import { useRequireAuth } from "../hooks/useRequireAuth";

const PlanShareRoomPage = () => {
  useRequireAuth();

  return (
    <div className="relative">
      <PlanShareRoom />
    </div>
  );
};

export default PlanShareRoomPage;
