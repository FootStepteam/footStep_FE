import { useState } from "react";
import {
  getMemberIdAPI,
  getPlanScheduleAPI,
  postCommunityAPI,
} from "../api/newPostAPI";
import { useSharedRoom } from "./useMyShareRoom";
import { IPlan } from "../type/newPost";
import Swal from "sweetalert2";

export const useEditor = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<IPlan | null>(null);

  const { shareRooms, plans } = useSharedRoom();

  const handleSelectPlan = async (plan: IPlan) => {
    setSelectedPlan(plan);
    try {
      const scheduleData = await getPlanScheduleAPI(plan.shareId);

      // 각 일정에 대해 반복하며 내용을 만듭니다.
      let contentString = "";
      for (let i = 0; i < scheduleData.length; i++) {
        const daySchedule = scheduleData[i];

        contentString += `${i + 1}일차 : ${daySchedule.planDate}<br />`;
        contentString += "장소: <br />";

        for (let j = 0; j < daySchedule.destinationDtoList.length; j++) {
          // 목적지 배열
          contentString += `- ${daySchedule.destinationDtoList[j].destinationName}<br />`;
          //   // 마지막 목적지가 아닌 경우에만 쉼표를 추가
          // if (j !== daySchedule.destinationDtoList.length - 1) {
          //   contentString += ", ";
          // }
        }
        contentString += "<br /><br />"; // 각 일정 구분
      }

      setContent(contentString);
    } catch (error) {
      console.error(error);
    }
  };

  const submitPost = async () => {
    try {
      if (!selectedPlan) {
        // 선택된 plan이 없을 때 알림창 로직
        Swal.fire({
          icon: "warning",
          title: "일정 선택 필요",
          text: "일정을 선택해야 글을 작성하실 수 있습니다.",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "확인",
        });
        return false;
      }

      const memberId = await getMemberIdAPI();
      const shareId = selectedPlan.shareId;
      await postCommunityAPI(memberId, shareId, title, isPublic, content);
      return true;
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
