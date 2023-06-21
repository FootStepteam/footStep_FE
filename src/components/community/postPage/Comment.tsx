import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { jwtAccessTokenState } from "../../../state/loginState";
import { deleteComment, updateComment } from "../../../api/communityAPI";
import { IComment, ICommunityPost } from "../../../type/communityPage";
import { getMemberByAccessToken } from "../../../api/memberAPI";

interface CommentProps {
  comment?: IComment;
  onCommentsChange: () => void;
  post: ICommunityPost;
}

const Comment = ({ comment, onCommentsChange }: CommentProps) => {
  const [isEditMode, setEditMode] = useState(!comment);
  const [content, setContent] = useState(comment?.content || "");
  const [memberId, setMemberId] = useState<number | null>(null);
  const token = useRecoilValue(jwtAccessTokenState);

  useEffect(() => {
    const fetchMemberId = async () => {
      try {
        const memberData = await getMemberByAccessToken(token);
        setMemberId(memberData.memberId);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMemberId();
  }, [token]);

  const handleUpdate = async () => {
    if (comment?.commentId && memberId === comment.memberId) {
      try {
        await updateComment(comment.commentId, { content });
        onCommentsChange();
        setEditMode(false);
        console.log(comment.memberId);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDelete = async () => {
    if (comment?.commentId && memberId === comment.memberId) {
      try {
        await deleteComment(comment.commentId);
        onCommentsChange();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="my-2">
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
        <>
          {isEditMode ? (
            <button
              onClick={handleUpdate}
              className="bg-blue-002 text-white-001 px-2 py-1 rounded mr-1"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="bg-blue-002 text-white-001 px-2 py-1 rounded mr-1"
            >
              Edit
            </button>
          )}
          <button
            onClick={handleDelete}
            className="bg-red-002 text-white-001 px-2 py-1 rounded mr-1"
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
};

export default Comment;
