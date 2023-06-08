import React from "react";

interface CategoryProps {
  onSelect: (category: string) => void;
  selectedCategory: string;
}

const Category: React.FC<CategoryProps> = ({ onSelect, selectedCategory }) => {
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

  const handleCategoryClick = (category: string) => {
    if (selectedCategory === category) {
      onSelect("");
    } else {
      onSelect(category);
    }
  };

  return (
    <div className="mb-4">
      <div>
        {categoriesFirstRow.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`px-1 mr-1 mb-2 border rounded-lg ${
              selectedCategory === category ? "bg-main-color" : "bg-white-color"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <div>
        {categoriesSecondRow.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`px-1 mr-1 mb-2 border rounded-lg ${
              selectedCategory === category ? "bg-main-color" : "bg-white-color"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Category;
