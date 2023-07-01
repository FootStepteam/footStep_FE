import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { getPostAPI, updatePostAPI } from "../../../api/postAPI";
import Swal from "sweetalert2";
import HeaderContainer from "../../common/header/HeaderContainer";
import Footer from "../../common/footer/Footer";

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
    <>
      <HeaderContainer />
      <div className="min-h-screen pt-[142px] p-8 bg-sky-004">
        <div className="p-8 mb-8 rounded-lg bg-white-001">
          <h2 className="mb-4 pb-4 w-full border-b-2 text-2xl font-bold text-blue-003">
            글 수정하기
          </h2>
          <CKEditor
            editor={ClassicEditor}
            data={postContent}
            onChange={(_event, editor) => {
              const data = editor.getData();
              setPostContent(data);
            }}
            onReady={(editor: any) => {
              editor.ui.view.editable.element.style.height = "500px";
            }}
          />
          <div className="flex justify-end mt-4">
            <button
              onClick={handleSubmit}
              className="p-2 rounded bg-blue-003 text-white"
            >
              수정하기
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EditPost;
