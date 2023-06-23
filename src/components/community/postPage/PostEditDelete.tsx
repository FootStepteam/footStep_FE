import { usePost } from "../../../hooks/usePost";
import { deletePostAPI } from "../../../api/postAPI";
import { useNavigate } from "react-router-dom";

const PostEditDelete = ({ postId }: { postId: number }) => {
  const { onCommentsChange } = usePost();
  const navigate = useNavigate();

  const handleUpdate = async () => {
    navigate(`/community/${postId}/edit`);
  };

  const handleDelete = async () => {
    try {
      await deletePostAPI(postId);
      onCommentsChange();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={handleUpdate}>수정</button>
      <button onClick={handleDelete}>삭제</button>
    </div>
  );
};

export default PostEditDelete;
