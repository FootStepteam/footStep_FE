import Swal from "sweetalert2";
import { usePost } from "../../../hooks/usePost";
import { deletePostAPI } from "../../../api/postAPI";
import { useNavigate } from "react-router-dom";

const PostEditDelete = ({ postId }: { postId: number }) => {
  const { onCommentsChange } = usePost();
  const navigate = useNavigate();

  const handleUpdate = async () => {
    Swal.fire({
      title: "게시글 수정하기 페이지로 이동합니다",
      icon: "info",
      confirmButtonText: "확인",
    }).then(() => {
      navigate(`/community/${postId}/edit`);
    });
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "게시글을 삭제하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "예",
      cancelButtonText: "아니오",
    });

    if (result.isConfirmed) {
      try {
        await deletePostAPI(postId);
        onCommentsChange();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <button
        className="bg-blue-002 text-white-001 px-2 py-1 rounded mr-1"
        onClick={handleUpdate}
      >
        수정
      </button>
      <button
        className="bg-red-002 text-white-001 px-2 py-1 rounded mr-1"
        onClick={handleDelete}
      >
        삭제
      </button>
    </div>
  );
};

export default PostEditDelete;
