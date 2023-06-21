import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ICommunityPost, IComment } from "../type/communityPage";
import { getPostAPI } from "../api/postAPI";

const Post = () => {
  const [post, setPost] = useState<ICommunityPost | null>(null);
  const { communityId } = useParams<{ communityId: string }>();

  useEffect(() => {
    const fetchData = async () => {
      if (!communityId) return; // communityId가 없을 때 처리

      try {
        const data = await getPostAPI(communityId);
        setPost(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [communityId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">{post.communityName}</h2>
      <p>{post.memberNickname}</p>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />{" "}
      {/* Render post content as HTML */}
      <p>Like Count: {post.likeCount}</p>
      <p>Comment Count: {post.commentCount}</p>
      {post.comments.map((comment: IComment) => (
        <div key={comment.commentId} className="mt-2 p-2 border">
          <p>{comment.memberNickname}</p>
          <p>{comment.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Post;
