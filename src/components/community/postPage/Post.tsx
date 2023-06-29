import { usePost } from "../../../hooks/usePost";
import Comment from "./Comment";
import CreateComment from "./CreateComment";
import Like from "./Like";
import { useEffect, useState } from "react";
import { getCurrentUserMemberId } from "../../../api/memberAPI";
import PostEditDelete from "./PostEditDelete";

const Post = () => {
  const { post, onCommentsChange } = usePost();
  const [memberId, setMemberId] = useState<number | undefined>(undefined);

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
      <div className="flex justify-center items-center w-full h-screen bg-gray-005">
        Loading...
      </div>
    );
  }
  console.log(post);

  return (
    <div className="min-h-screen p-8 bg-sky-004">
      <div className="p-8 mb-8 rounded-lg bg-white-001">
        <div className="flex">
          <h2 className="mb-4 pb-4 w-full border-b-2 text-2xl font-bold text-blue-003">
            {post.communityName}
          </h2>
          {post.memberId === memberId && (
            <PostEditDelete postId={post.communityId} />
          )}
        </div>
        <p className="mb-4 text-gray-001">{post.memberNickname}</p>
      </div>
      <div
        className="mb-8 p-6 rounded-md bg-white"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />{" "}
      <div className="p-6 mb-8 rounded-lg bg-white-001">
        <Like
          communityId={post.communityId}
          initialLikeCount={post.likeCount}
        />
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
      </div>
    </div>
  );
};

export default Post;
