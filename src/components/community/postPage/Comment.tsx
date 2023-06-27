import { useState, useEffect } from "react";
import { deleteComment, updateComment } from "../../../api/communityAPI";
import { IComment, ICommunityPost } from "../../../type/communityPage";
import { getCurrentUserMemberId } from "../../../api/memberAPI";
import Swal from "sweetalert2";

interface CommentProps {
  comment?: IComment;
  onCommentsChange: () => void;
  post: ICommunityPost;
}

const Comment = ({ comment, onCommentsChange }: CommentProps) => {
  const [isEditMode, setEditMode] = useState(!comment);
  const [content, setContent] = useState(comment?.content || "");
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

  const handleUpdate = async () => {
    if (comment?.commentId && memberId === comment.memberId) {
      const result = await Swal.fire({
        title: "댓글을 수정하시겠습니까?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "예",
        cancelButtonText: "아니오",
      });

      if (result.isConfirmed) {
        try {
          await updateComment(comment.commentId, { content });
          onCommentsChange();
          setEditMode(false);
        } catch (error) {
          console.error(error);
        }
      }
    }
  };
  const handleDelete = async () => {
    if (comment?.commentId && memberId === comment.memberId) {
      const result = await Swal.fire({
        title: "댓글을 삭제하시겠습니까?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "예",
        cancelButtonText: "아니오",
      });

      if (result.isConfirmed) {
        try {
          await deleteComment(comment.commentId);
          onCommentsChange();
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  return (
    <div className="my-2 p-2 border border-gray-002 rounded">
      {isEditMode ? (
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border rounded px-2 py-1 w-full"
        />
      ) : (
        <p className="text-sm">{content}</p>
      )}
      <p className="text-xs text-gray-001">{comment?.memberNickname}</p>
      {memberId === comment?.memberId && (
        <div className="flex space-x-2 mt-2">
          {isEditMode ? (
            <button
              onClick={handleUpdate}
              className="bg-blue-002 text-white-001 px-2 py-1 rounded mr-1"
            >
              저장
            </button>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="bg-blue-002 text-white-001 px-2 py-1 rounded mr-1"
            >
              수정
            </button>
          )}
          <button
            onClick={handleDelete}
            className="bg-red-002 text-white-001 px-2 py-1 rounded mr-1"
          >
            삭제
          </button>
        </div>
      )}
    </div>
  );
};

export default Comment;
