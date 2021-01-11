import React from "react";
import {
  categoryNamesById,
  priceNumberFormat,
  categoryIconsById,
} from "../utils.js";

const Expense = (props) => {
  const { id, description, categoryId, amount } = props;
  return (
    <div
      key={id}
      class="flex pl-5 pr-5 pb-3 pt-2 justify-between border border-gray-200 border-t-1 border-b-1 shadow-md"
    >
      <div>
        <p className="text-lg text-gray-500">
          {categoryIconsById[categoryId]} {description}
        </p>
        <p className="text-xs text-gray-400 capitalize">
          {categoryNamesById[categoryId]}
        </p>
      </div>
      <div className="flex items-center">
        <p className="text-xl flex justify-end text-pink-400 font-bold">
          ${priceNumberFormat.format(amount)}
        </p>
      </div>
    </div>
  );
};

export default Expense;
