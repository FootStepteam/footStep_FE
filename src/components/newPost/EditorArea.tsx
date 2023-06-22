import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useEditor } from "../../hooks/useEditor";
import { useEffect } from "react";
import { getCookie } from "../../utils/cookie";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const EditorArea = () => {
  const {
    // title,
    setTitle,
    content,
    setContent,
    // isPublic,
    setIsPublic,
    selectedPlan,
    // setSelectedPlan,
    plans,
    handleSelectPlan,
    submitPost,
  } = useEditor();
  const navigate = useNavigate();

  useEffect(() => {
    const token = getCookie("accessToken");
    if (!token) {
      Swal.fire({
        icon: "error",
        title: "접근 불가",
        text: "게시글 작성은 로그인 후 이용 가능합니다.",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "확인",
      });
      navigate("/community");
    }
  }, []);

  const submitPostWithConfirmation = async () => {
    if (!selectedPlan) {
      Swal.fire({
        icon: "warning",
        title: "일정 선택 필요",
        text: "일정을 선택해야 글을 작성하실 수 있습니다.",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "확인",
      });
      return;
    }

    const result = await Swal.fire({
      title: "게시글 작성",
      text: "작성한 내용으로 게시하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "네",
      cancelButtonText: "취소",
      reverseButtons: true,
    });
    if (result.isConfirmed) {
      submitPost();
      Swal.fire("성공!", "게시글이 정상적으로 등록되었습니다", "success");
      navigate("/community");
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire("취소", "게시글이 등록되지 않았습니다", "error");
    }
  };

  return (
    <div className="min-h-screen p-10">
      <div>
        <select
          value={selectedPlan ? selectedPlan.shareName : ""}
          onChange={(e) => {
            const selectedPlanName = e.target.value;
            const selectedPlan = plans.find(
              (plan) => plan.shareName === selectedPlanName
            );
            if (selectedPlan) {
              handleSelectPlan(selectedPlan);
            }
          }}
        >
          <option value="">일정을 선택해주세요</option>
          {plans.map((plan) => (
            <option key={plan.shareId} value={plan.shareName}>
              {plan.shareName}
            </option>
          ))}
        </select>
      </div>
      <input
        type="text"
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-4 border-2 border-gray-002 rounded-md"
      />
      <label className="flex items-center mb-4">
        <input
          type="checkbox"
          onChange={(e) => setIsPublic(e.target.checked)}
          className="mr-2"
        />
        Public
      </label>
      <div className="w-full p-2 mb-4 border-2 border-gray-002 rounded-md">
        <CKEditor
          editor={ClassicEditor}
          data={content}
          onChange={(_event, editor) => {
            const data = editor.getData();
            setContent(data);
          }}
        />
      </div>

      <button
        onClick={submitPostWithConfirmation}
        className="w-[150px] p-2 bg-blue-002 text-white-001 rounded-md"
      >
        게시하기
      </button>
    </div>
  );
};
export default EditorArea;
