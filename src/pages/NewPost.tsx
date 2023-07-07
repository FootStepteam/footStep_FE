import EditorArea from "../components/newPost/EditorArea";
import HeaderContainer from "../components/common/header/HeaderContainer";
import Footer from "../components/common/footer/Footer";
import { useRequireAuth } from "../hooks/useRequireAuth";

const NewPost = () => {
  useRequireAuth();

  return (
    <>
      <HeaderContainer />
      <EditorArea />
      <Footer />
    </>
  );
};

export default NewPost;
