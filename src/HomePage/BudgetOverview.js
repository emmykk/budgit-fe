import React from "react";
import {
  getPrettyDate,
  getSplitCurrency,
  addTrailingZeroToDecimal,
  priceNumberFormat,
} from "../utils.js";

const BudgetOverview = (props) => {
  const { household, currentDateAsArray, totalExpenses } = props;
  const remainingIncomeAsSplitArr = household
    ? getSplitCurrency(
        priceNumberFormat.format(household.income - totalExpenses)
      )
    : null;
  const remainingIncomeWhole = household ? remainingIncomeAsSplitArr[0] : null;
  const remainingIncomeFractional = household
    ? remainingIncomeAsSplitArr[1]
    : null;

  return (
    <div>
      <div className="flex justify-between py-3 items-center bg-purple-400 pl-5 pr-5">
        <p className="text-lg font-bold text-white ">
          Overview for {household ? household.name : null}
        </p>
      </div>
      <p className="text-gray-600 pl-5 pt-2 text-xs w-full">
        {getPrettyDate(...currentDateAsArray)}
      </p>
      <div className="lighten-4 center p-6">
        <div>
          <p class="text-green-500 text-6xl font-bold">
            <sup className="text-4xl">$</sup>
            {remainingIncomeWhole}
            <sup className="text-xl">.{remainingIncomeFractional}</sup>
          </p>
          <p className="text-sm text-gray-500">remaining this month</p>
        </div>
        <div
          className="flex items-center justify-around mt-6"
          style={{ borderTop: "1px solid lavender", paddingTop: "12px" }}
        >
          <div>
            <p className="text-lg text-pink-500 font-bold">
              <sup>$</sup>
              {priceNumberFormat.format(totalExpenses)}
            </p>
            <p className="text-sm text-gray-500">spent this month</p>
          </div>
          <div>
            <p className="text-lg">
              <span className="text-blue-400 font-bold">
                / <sup>$</sup>
                {household
                  ? `${priceNumberFormat.format(household.income)}`
                  : null}
              </span>
              <p className="text-sm text-gray-500"> budgeted</p>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetOverview;
