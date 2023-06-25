interface PaginationProps {
  page: number;
  lastPage: boolean;
  setPage: (page: number) => void;
}

const Pagination = ({ page, lastPage, setPage }: PaginationProps) => {
  const handlePrevious = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (!lastPage) {
      setPage(page + 1);
    }
  };

  return (
    <div className="flex justify-center items-center mt-4">
      <button
        className="mx-2 px-4 py-2 bg-gray-003 rounded-md"
        onClick={handlePrevious}
        disabled={page === 0}
      >
        이전
      </button>
      <div>{page + 1}</div>
      <button
        className="mx-2 px-4 py-2 bg-gray-003 rounded-md"
        onClick={handleNext}
        disabled={lastPage}
      >
        다음
      </button>
    </div>
  );
};

export default Pagination;
