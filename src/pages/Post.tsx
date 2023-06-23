import { usePost } from "../hooks/usePost";
import Comment from "../components/community/postPage/Comment";
import CreateComment from "../components/community/postPage/CreateComment";
import Like from "../components/community/postPage/Like";

const Post = () => {
  const { post, onCommentsChange } = usePost();

  if (!post) {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-gray-005">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-gray-007 p-8">
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
    </div>
  );
};

export default Post;
