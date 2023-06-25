import { useState, useEffect, MouseEvent } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as NoProfile } from "../../assets/smile.svg";
import { ReactComponent as Like } from "../../assets/like.svg";
import { getCommunityAPI } from "../../api/communityAPI";
import {
  ICommunityData,
  ICommunityPost,
  IListsProps,
} from "../../type/communityPage";
import { getCookie } from "../../utils/cookie";
import Swal from "sweetalert2";
import Pagination from "./Pagination";

const Lists = ({ searchQuery }: IListsProps) => {
  const [sortBy, setSortBy] = useState<"recent" | "like">("recent");
  const [posts, setPosts] = useState<ICommunityPost[]>([]);
  const [page, setPage] = useState<number>(0);
  const [lastPage, setLastPage] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const data: ICommunityData = await getCommunityAPI({
          page,
          size: 5,
          sort: sortBy,
        });
        console.log(data);
        setPosts(data.communities);
        setLastPage(data.lastPage);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [sortBy, page]);

  // 검색어로 게시글 필터링
  const filteredPosts: ICommunityPost[] = posts.filter((post) => {
    const matchSearchQuery: boolean = post.communityName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchSearchQuery;
  });

  const handleSortByrecent = () => {
    setSortBy("recent");
  };

  const handleSortByPopular = () => {
    setSortBy("like");
  };

  const handleNewPostClick = (event: MouseEvent) => {
    const token = getCookie("accessToken");
    if (!token) {
      event.preventDefault();
      Swal.fire({
        icon: "error",
        title: "로그인 필요",
        text: "게시글 작성은 로그인 후 이용 가능합니다.",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "확인",
      });
    }
  };

  return (
    <div className="flex flex-col mx-auto pt-[40px] w-2/3 min-h-screen">
      <div className="flex justify-between mb-4">
        <div className="flex">
          <button
            type="button"
            className={`px-4 py-2 border-r-2 ${
              sortBy === "recent" ? "text-blue-003 font-bold" : ""
            }`}
            onClick={handleSortByrecent}
          >
            최신순
          </button>
          <button
            type="button"
            className={`px-4 py-2 ${
              sortBy === "like" ? "text-blue-003 font-bold" : ""
            }`}
            onClick={handleSortByPopular}
          >
            인기순
          </button>
        </div>
        <div className="flex">
          <Link to="/community/newpost" onClick={handleNewPostClick}>
            <button
              type="button"
              className="px-4 py-2 rounded-lg bg-blue-003 text-white-001"
            >
              새 게시글
            </button>
          </Link>
        </div>
      </div>
      {filteredPosts.length === 0 ? (
        <div className="flex justify-center items-center mt-[60px]">
          <p className="text-xl font-medium">검색 결과가 없습니다</p>
        </div>
      ) : (
        <ul className="w-full">
          {filteredPosts.map((post) => (
            <li key={post.communityId}>
              <Link to={`/community/${post.communityId}`}>
                <div className="flex justify-between w-full mb-4 px-8 py-2 border-2 border-blue-003 rounded-lg">
                  <div>
                    <p className="mb-2 text-xl font-bold">
                      {post.communityName}
                    </p>
                    <div className="flex">
                      <p>작성일: {post.createdDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <NoProfile width={16} height={16} />
                    <p className="ml-1 mr-4 font-medium">
                      {post.memberNickname}
                    </p>
                    <div>
                      <p className="flex items-center">
                        <Like width={20} height={20} /> {post.likeCount}
                      </p>
                      <p className="font-thin text-sm text-gray-002">
                        작성일: {post.createdDate}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
      <Pagination page={page} lastPage={lastPage} setPage={setPage} />
    </div>
  );
};

export default Lists;
