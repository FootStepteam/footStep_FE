import { useState } from "react";
import { likePostAPI, unlikePostAPI } from "../../../api/postAPI";
import { ILikeProps } from "../../../type/communityPage";

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
      <button onClick={handleLike}>{isLiked ? "Unlike" : "Like"}</button>
      <p>Like Count: {likeCount}</p>
    </div>
  );
};

export default Like;
