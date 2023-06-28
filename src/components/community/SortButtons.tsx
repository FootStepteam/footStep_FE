interface ISortButtonsProps {
  sortBy: "recent" | "like";
  onSortChange: (sortBy: "recent" | "like") => void;
  showPrivate: boolean;
  handlePrivatePostsToggle: () => void;
}

const SortButtons = ({
  sortBy,
  onSortChange,
  showPrivate,
  handlePrivatePostsToggle,
}: ISortButtonsProps) => {
  return (
    <div className="flex">
      <button
        type="button"
        className={`px-4 py-2 border-r-2 ${
          sortBy === "recent" ? "text-blue-003 font-bold" : "text-black-001"
        }`}
        onClick={() => onSortChange("recent")}
      >
        최신순
      </button>
      <button
        type="button"
        className={`px-4 py-2 border-r-2 ${
          sortBy === "like" ? "text-blue-003 font-bold" : "text-black-001"
        }`}
        onClick={() => onSortChange("like")}
      >
        인기순
      </button>
      <button
        className={`px-4 py-2 ${
          showPrivate ? "text-blue-003 font-bold" : "text-black-001"
        }`}
        onClick={handlePrivatePostsToggle}
      >
        나만의 게시글 보기
      </button>
    </div>
  );
};

export default SortButtons;
