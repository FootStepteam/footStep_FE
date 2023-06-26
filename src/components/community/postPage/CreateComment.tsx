import { useState, useEffect } from "react";
import { createComment } from "../../../api/communityAPI";
import { ICommunityPost } from "../../../type/communityPage";
import { getMemberByAccessToken } from "../../../api/memberAPI";
import Swal from "sweetalert2";

interface CreateCommentProps {
  onCommentsChange: () => void;
  post: ICommunityPost;
}

const CreateComment = ({ onCommentsChange, post }: CreateCommentProps) => {
  const [content, setContent] = useState("");
  const [memberId, setMemberId] = useState<number | null>(null);

  useEffect(() => {
    const fetchMemberId = async () => {
      try {
        const memberData = await getMemberByAccessToken();
        setMemberId(memberData.memberId);
      } catch (error) {
        // console.error(error);
      }
    };

    fetchMemberId();
  }, []);

  const handleCreate = async () => {
    // 내용 없을 때 작성 불가 처리
    if (!content.trim()) {
      Swal.fire({
        title: "댓글 내용을 입력해주세요",
        icon: "info",
        confirmButtonText: "확인",
      });
      return;
    }
    // 사용자에게 댓글 작성 확인 메시지
    const result = await Swal.fire({
      title: "댓글을 작성하시겠습니까?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "예",
      cancelButtonText: "아니오",
    });

    if (result.isConfirmed && memberId && post) {
      try {
        console.log(memberId);
        await createComment(
          { content, communityId: post.communityId },
          memberId
        );
        onCommentsChange();
        setContent("");
      } catch (error) {
        console.error(error);
      }
    }
  };

  // 비로그인 시 댓글작성 불가
  if (!memberId) return null;

  return (
    <div className="my-2">
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border rounded px-2 py-1 w-full"
        placeholder="댓글을 입력해주세요"
      />
      <button
        onClick={handleCreate}
        className="bg-green-002 text-white-001 px-2 py-1 rounded mt-2"
      >
        작성
      </button>
    </div>
  );
};

export default CreateComment;
