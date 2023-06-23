import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { getPostAPI, updatePostAPI } from "../../../api/postAPI";
import Swal from "sweetalert2";

const EditPost = () => {
  const { communityId } = useParams();
  const [postContent, setPostContent] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPostContent = async () => {
      try {
        const postData = await getPostAPI(Number(communityId));
        setPostContent(postData.content);
      } catch (error) {
        // error handling
      }
    };

    fetchPostContent();
  }, [communityId]);

  const handleSubmit = async () => {
    const result = await Swal.fire({
      title: "글을 수정하시겠습니까?",
      showDenyButton: true,
      confirmButtonText: "수정하기",
      denyButtonText: "취소",
    });

    if (result.isConfirmed) {
      try {
        await updatePostAPI(Number(communityId), postContent);
        navigate(`/community/${communityId}`);
      } catch (error) {
        // error handling
      }
    }
  };
  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        data={postContent}
        onChange={(_event, editor) => {
          const data = editor.getData();
          setPostContent(data);
        }}
      />
      <button onClick={handleSubmit}>수정하기</button>
    </div>
  );
};

export default EditPost;
