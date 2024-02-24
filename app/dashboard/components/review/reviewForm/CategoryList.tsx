import React from "react";

const CategoryList = ({ categories }: any) => {
  return (
    <div className="my-4 flex flex-wrap gap-1">
      {categories.map((category: { id: string; keyword: string }) => {
        return (
          <div
            key={category.keyword}
            className="border border-[#15b5bf] rounded px-2 py-1 text-[12px] text-[#15b5bf]"
          >
            {category.keyword}
          </div>
        );
      })}
    </div>
  );
};

export default CategoryList;
