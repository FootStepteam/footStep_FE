import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ICommunityPost } from "../type/communityPage";
import { getPostAPI } from "../api/postAPI";
import Comment from "../components/community/postPage/Comment";
import CreateComment from "../components/community/postPage/CreateComment";

const Post = () => {
  const [post, setPost] = useState<ICommunityPost | null>(null);
  const { communityId } = useParams<{ communityId: string }>();

  const onCommentsChange = async () => {
    if (!communityId) return; // communityId가 없을 때 함수를 종료
    const data = await getPostAPI(communityId);
    setPost(data);
  };

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
      <p>Like Count: {post.likeCount}</p>
      <p>Comment Count: {post.commentCount}</p>
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
