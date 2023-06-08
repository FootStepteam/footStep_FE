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
  // 예시 데이터
  const posts: Post[] = [
    {
      id: 1,
      title: "Post 1",
      category: "서울",
      userId: "user1",
      imgurl: "https://example.com/image1.jpg",
      likes: 10,
      createdAt: "2023-06-01",
      departureDate: "2023-06-10",
      arrivalDate: "2023-06-15",
    },
    {
      id: 2,
      title: "Post 2",
      category: "부산",
      userId: "user2",
      imgurl: "https://example.com/image2.jpg",
      likes: 5,
      createdAt: "2023-06-02",
      departureDate: "2023-06-12",
      arrivalDate: "2023-06-17",
    },
    {
      id: 3,
      title: "Post 3",
      category: "서울",
      userId: "user2123",
      imgurl: "https://example.com/image2.jpg",
      likes: 5,
      createdAt: "2023-06-02",
      departureDate: "2023-06-12",
      arrivalDate: "2023-06-17",
    },
    {
      id: 4,
      title: "Post 4",
      category: "경기",
      userId: "user122",
      imgurl: "https://example.com/image2.jpg",
      likes: 5,
      createdAt: "2023-06-02",
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

  return (
    <div className="flex justify-center mx-auto pt-[40px] w-2/3 min-h-screen">
      {filteredPosts.length === 0 ? (
        <p>검색 결과가 없습니다.</p>
      ) : (
        <ul className="w-full">
          {filteredPosts.map((post) => (
            <li key={post.id}>
              <a href={`/community/${post.id}`}>
                <div className="flex justify-between w-full mb-4 px-8 py-2 border-2 border-main-color rounded-lg">
                  <div>
                    <p className=" mb-2 text-xl font-bold">{post.title}</p>
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
                      <p className="font-thin text-sm text-placeholder-color">
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
