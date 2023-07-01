import { useState } from "react";
import { likePostAPI, unlikePostAPI } from "../../../api/postAPI";
import { ILikeProps } from "../../../type/communityPage";
import { ReactComponent as Heart } from "../../../assets/heartNoFill.svg";
import { ReactComponent as HeartFill } from "../../../assets/heartFill.svg";
import Swal from "sweetalert2";
import { getCookie } from "../../../utils/cookie";

const Like = ({ communityId, initialLikeCount }: ILikeProps) => {
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = async () => {
    const KEY = "accessToken";
    const token = getCookie(KEY);
    // 비로그인 좋아요시 처리
    if (!token) {
      Swal.fire({
        title: "로그인 후 이용 가능합니다.",
        icon: "info",
        confirmButtonText: "확인",
      });
      return;
    }
    // 정상 처리
    if (isLiked) {
      await unlikePostAPI(communityId);
      setLikeCount(likeCount - 1);
    } else {
      await likePostAPI(communityId);
      setLikeCount(likeCount + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <div className="flex items-center mb-2">
      <button
        className={`mr-2 focus:outline-none ${isLiked ? "animate-jump" : ""}`}
        onClick={handleLike}
      >
        {isLiked ? (
          <HeartFill width={20} height={20} className="text-red-001" />
        ) : (
          <Heart width={20} height={20} className="text-black-002" />
        )}
      </button>
      <p className="text-gray-001">좋아요 {likeCount} 개</p>
    </div>
  );
};

export default Like;
