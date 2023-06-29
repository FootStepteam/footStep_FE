import Footer from "../components/common/footer/Footer";
import HeaderContainer from "../components/common/header/HeaderContainer";
import Post from "../components/community/postPage/Post";

const PostPage = () => {
  return (
    <div className="pt-[112px]">
      <HeaderContainer />
      <Post />
      <Footer />
    </div>
  );
};

export default PostPage;
