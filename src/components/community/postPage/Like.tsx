import { useState } from "react";
import { likePostAPI, unlikePostAPI } from "../../../api/postAPI";
import { ILikeProps } from "../../../type/communityPage";
import { ReactComponent as Heart } from "../../../assets/heartNoFill.svg";
import { ReactComponent as HeartFill } from "../../../assets/heartFill.svg";

const Like = ({ communityId, initialLikeCount }: ILikeProps) => {
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = async () => {
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
    <div>
      <button className={isLiked ? "animate-jump" : ""} onClick={handleLike}>
        {isLiked ? (
          <HeartFill width={20} height={20} />
        ) : (
          <Heart width={20} height={20} />
        )}
      </button>
      <p>좋아요 {likeCount}</p>
    </div>
  );
};

export default Like;
