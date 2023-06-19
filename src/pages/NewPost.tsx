import { useState } from "react";
import { useRecoilState } from "recoil";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [shareId, setShareId] = useState(0);

  const submitPost = async () => {
    try {
      const response = await axios.post("/api/api/community", {
        communityName: title,
        communityPublicState: isPublic,
        content: content,
        shareId: shareId,
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-10">
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
          onChange={(event, editor) => {
            const data = editor.getData();
            setContent(data);
          }}
        />
      </div>
      <input
        type="number"
        placeholder="Share ID"
        onChange={(e) => setShareId(Number(e.target.value))}
        className="w-full p-2 mb-4 border-2 border-gray-002 rounded-md"
      />
      <button
        onClick={submitPost}
        className="w-[150px] p-2 bg-blue-002 text-white-001 rounded-md"
      >
        게시하기
      </button>
    </div>
  );
};

export default NewPost;
