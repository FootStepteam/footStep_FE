import { usePost } from "../../../hooks/usePost";
import Comment from "./Comment";
import CreateComment from "./CreateComment";
import Like from "./Like";
import { useEffect, useState } from "react";
import { getMemberByAccessToken } from "../../../api/memberAPI";
import PostEditDelete from "./PostEditDelete";

const Post = () => {
  const { post, onCommentsChange } = usePost();
  const [memberNickname, setMemberNickname] = useState<string | null>(null);

  useEffect(() => {
    const fetchMemberNickname = async () => {
      try {
        const memberData = await getMemberByAccessToken();
        setMemberNickname(memberData.nickname);
      } catch (error) {
        // console.error(error);
      }
    };

    fetchMemberNickname();
  }, []);

  if (!post) {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-gray-005">
        Loading...
      </div>
    );
  }

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
      {post.memberNickname === memberNickname && (
        <PostEditDelete postId={post.communityId} />
      )}
    </div>
  );
};

export default Post;
