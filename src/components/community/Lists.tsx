import { useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as NoProfile } from "../../assets/smile.svg";
import { ReactComponent as Like } from "../../assets/like.svg";

interface Post {
  id: number;
  title: string;
  category: string;
  userId: string;
  imgurl: string;
  likes: number;
  createdAt: string;
  departureDate: string;
  arrivalDate: string;
}

interface ListsProps {
  searchQuery: string;
  selectedCategory: string;
}

const Lists = ({ searchQuery, selectedCategory }: ListsProps) => {
  const [sortBy, setSortBy] = useState<"latest" | "popular">("latest");

  // 예시 데이터
  const posts: Post[] = [
    {
      id: 1,
      title: "Postaa 1",
      category: "서울",
      userId: "user1",
      imgurl: "https://example.com/image1.jpg",
      likes: 12342134,
      createdAt: "2023-06-01",
      departureDate: "2023-06-10",
      arrivalDate: "2023-06-15",
    },
    {
      id: 2,
      title: "Postff 2",
      category: "부산",
      userId: "user2",
      imgurl: "https://example.com/image2.jpg",
      likes: 1231,
      createdAt: "2023-06-04",
      departureDate: "2023-06-12",
      arrivalDate: "2023-06-17",
    },
    {
      id: 3,
      title: "Postbb 3",
      category: "서울",
      userId: "user2123",
      imgurl: "https://example.com/image2.jpg",
      likes: 51234,
      createdAt: "2023-06-02",
      departureDate: "2023-06-12",
      arrivalDate: "2023-06-17",
    },
    {
      id: 4,
      title: "Postaa 4",
      category: "경기",
      userId: "user122",
      imgurl: "https://example.com/image2.jpg",
      likes: 512313,
      createdAt: "2023-06-03",
      departureDate: "2023-06-12",
      arrivalDate: "2023-06-17",
    },
  ];

  // 검색어와 카테고리에 따라 필터링된 게시글 목록
  const filteredPosts: Post[] = posts.filter((post) => {
    const matchSearchQuery: boolean = post.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchCategory: boolean =
      selectedCategory === "" || post.category === selectedCategory;
    return matchSearchQuery && matchCategory;
  });

  // 최신순 또는 인기순으로 정렬된 게시글 목록
  const sortedPosts: Post[] =
    sortBy === "latest"
      ? filteredPosts.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1)) // 최신순 정렬
      : filteredPosts.sort((a, b) => b.likes - a.likes); // 인기순 정렬

  // 검색어에 따라 필터링된 게시글 목록에서 title과 일치하는 게시글 필터링
  const matchedPosts: Post[] = sortedPosts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSortByLatest = () => {
    setSortBy("latest");
  };

  const handleSortByPopular = () => {
    setSortBy("popular");
  };

  return (
    <div className="flex flex-col mx-auto pt-[40px] w-2/3 min-h-screen">
      <div className="flex justify-between mb-4">
        <div className="flex">
          <button
            type="button"
            className={`px-4 py-2 border-r-2 ${
              sortBy === "latest" ? "text-blue-003 font-bold" : ""
            }`}
            onClick={handleSortByLatest}
          >
            최신순
          </button>
          <button
            type="button"
            className={`px-4 py-2 ${
              sortBy === "popular" ? "text-blue-003 font-bold" : ""
            }`}
            onClick={handleSortByPopular}
          >
            인기순
          </button>
        </div>
        <div className="flex">
          <Link to="/community/newpost">
            <button
              type="button"
              className="px-4 py-2 rounded-lg bg-blue-003 text-white-001"
            >
              새 게시글
            </button>
          </Link>
        </div>
      </div>
      {matchedPosts.length === 0 ? (
        <div className="flex justify-center items-center mt-[60px]">
          <p className="text-xl font-medium">검색 결과가 없습니다</p>
        </div>
      ) : (
        <ul className="w-full">
          {matchedPosts.map((post) => (
            <li key={post.id}>
              <a href={`/community/${post.id}`}>
                <div className="flex justify-between w-full mb-4 px-8 py-2 border-2 border-blue-003 rounded-lg">
                  <div>
                    <p className="mb-2 text-xl font-bold">{post.title}</p>
                    <div className="flex">
                      <p>
                        일정 : {post.departureDate} ~ {post.arrivalDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <NoProfile width={16} height={16} />
                    <p className="ml-1 mr-4 font-medium">{post.userId}</p>
                    <div>
                      <p className="flex items-center">
                        <Like width={20} height={20} /> {post.likes}
                      </p>
                      <p className="font-thin text-sm text-gray-002">
                        작성일: {post.createdAt}
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Lists;
