const PlaceSearchCategory = () => {
  const categoriesFirstRow: string[] = [
    "서울",
    "경기",
    "인천",
    "부산",
    "대구",
    "울산",
    "대전",
    "강원",
  ];
  const categoriesSecondRow: string[] = [
    "충남",
    "충북",
    "전남",
    "전북",
    "광주",
    "경남",
    "경북",
    "제주",
  ];
  return (
    <div className="mt-2">
      <div>
        {categoriesFirstRow.map((category) => (
          <button
            key={category}
            type="button"
            className="px-1 mr-1 mb-2 border rounded-lg bg-white-color"
          >
            {category}
          </button>
        ))}
      </div>
      <div>
        {categoriesSecondRow.map((category) => (
          <button
            key={category}
            type="button"
            className="px-1 mr-1 mb-2 border rounded-lg bg-white-color"
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PlaceSearchCategory;
