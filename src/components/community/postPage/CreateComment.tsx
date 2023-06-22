import { useState, useEffect } from "react";
import { createComment } from "../../../api/communityAPI";
import { ICommunityPost } from "../../../type/communityPage";
import { getMemberByAccessToken } from "../../../api/memberAPI";

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
        console.error(error);
      }
    };

    fetchMemberId();
  }, []);

  const handleCreate = async () => {
    if (memberId && post) {
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
        Post
      </button>
    </div>
  );
};

export default CreateComment;
