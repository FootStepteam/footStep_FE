import { usePost } from "../../../hooks/usePost";
import Comment from "./Comment";
import CreateComment from "./CreateComment";
import Like from "./Like";
import { useEffect, useState } from "react";
import { getCurrentUserMemberId } from "../../../api/memberAPI";
import PostEditDelete from "./PostEditDelete";

const Post = () => {
  const { post, onCommentsChange } = usePost();
  const [memberId, setMemberId] = useState<number | null>(null);

  useEffect(() => {
    const fetchMemberId = async () => {
      try {
        const memberId = await getCurrentUserMemberId();
        setMemberId(memberId);
      } catch (error) {
        // console.error(error);
      }
    };

    fetchMemberId();
  }, []);

  if (!post) {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-gray-005">
        Loading...
      </div>
    );
  }
  console.log(post);

  return (
    <div className="min-h-screen p-8 bg-gray-007">
      <h2 className="text-2xl font-bold text-blue-003 mb-4">
        {post.communityName}
      </h2>
      <p className="text-gray-001 mb-4">{post.memberNickname}</p>
      <div
        className="bg-white p-4 rounded-md mb-4"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />{" "}
      <Like communityId={post.communityId} initialLikeCount={post.likeCount} />
      <p className="text-gray-002 mb-4">댓글 {post.commentCount} 개</p>
      {post.comments.map((comment) => (
        <Comment
          post={post}
          key={comment.commentId}
          comment={comment}
          onCommentsChange={onCommentsChange}
        />
      ))}
      <CreateComment post={post} onCommentsChange={onCommentsChange} />
      {post.memberId === memberId && (
        <PostEditDelete postId={post.communityId} />
      )}
    </div>
  );
};

export default Post;
