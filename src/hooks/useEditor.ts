import { useState } from "react";
import {
  getMemberIdAPI,
  getPlanScheduleAPI,
  postCommunityAPI,
} from "../api/newPostAPI";
import { useSharedRoom } from "./useMyShareRoom";
import { IPlan } from "../type/newPost";

export const useEditor = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<IPlan | null>(null);

  const { shareRooms, plans, token } = useSharedRoom();

  const handleSelectPlan = async (plan: IPlan) => {
    setSelectedPlan(plan);
    try {
      const scheduleData = await getPlanScheduleAPI(plan.shareId);
      const { destinationRedisInfo, planDate } = scheduleData;
      const defaultContent = `Destination: ${destinationRedisInfo[0].destinationName}, Date: ${planDate}`;
      setContent(defaultContent);
    } catch (error) {
      console.error(error);
    }
  };

  const submitPost = async () => {
    try {
      const memberId = await getMemberIdAPI(token);
      if (selectedPlan) {
        const shareId = selectedPlan.shareId;
        await postCommunityAPI(memberId, shareId, title, isPublic, content);
      } else {
        // 선택된 plan이 없을 때의 처리 로직 추가
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    title,
    setTitle,
    content,
    setContent,
    isPublic,
    setIsPublic,
    selectedPlan,
    setSelectedPlan,
    shareRooms,
    plans,
    handleSelectPlan,
    submitPost,
  };
};
