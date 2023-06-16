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
    <div className="grid grid-cols-8 mt-6">
      {categoriesFirstRow.map((category) => (
        <p
          key={category}
          className="flex justify-center items-center py-2 bg-white border border-gray-003 cursor-pointer"
          role="presentation"
        >
          {category}
        </p>
      ))}
    </div>
  );
};

export default PlaceSearchCategory;
