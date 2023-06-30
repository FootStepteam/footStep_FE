import { ReactComponent as LeftArrow } from "../../assets/arrow-left-circle.svg";
import { ReactComponent as RightArrow } from "../../assets/arrow-right-circle.svg";

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
        className="px-4 py-2 rounded-md hover:scale-105 transition-all duration-250"
        onClick={handlePrevious}
        disabled={page === 0}
      >
        <LeftArrow width={20} height={20} />
      </button>
      <div className="mx-2">{page + 1}</div>
      <button
        className="px-4 py-2 rounded-md hover:scale-105 transition-all duration-250"
        onClick={handleNext}
        disabled={lastPage}
      >
        <RightArrow width={20} height={20} />
      </button>
    </div>
  );
};

export default Pagination;
