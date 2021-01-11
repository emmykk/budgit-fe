import React, { useState } from "react";
import Button from "@material-ui/core/Button";

const grayTextColor = "text-gray-600 text-sm";

const ExpenseForm = (props) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const handleAmountInputChange = (event) => setAmount(event.target.value);
  const handleDescriptionInputChange = (event) =>
    setDescription(event.target.value);

  return (
    <form
      className="bg-purple-200 py-6 flex justify-center"
      style={{ borderBottom: "1px solid lightgray" }}
    >
      <div className="p-6 bg-white rounded-2xl" style={{ width: "90%" }}>
        <p
          className="font-bold text-sm text-gray-500 pb-4 mb-3"
          style={{ borderBottom: "1px solid lightgray" }}
        >
          Add a New Expense
        </p>
        <div className="flex justify-center">
          {" "}
          <div className="w-full">
            <p className={grayTextColor}>Amount in $</p>
            <p>
              <input
                type="text"
                placeholder="e.g. 15 or 15.00"
                value={amount}
                type="number"
                onChange={handleAmountInputChange}
              ></input>
            </p>
            <p className={grayTextColor}>Description</p>
            <p>
              <input
                type="text"
                placeholder="Takeout from VeggieGrill"
                value={description}
                required
                minLength="6"
                required
                maxLength="255"
                onChange={handleDescriptionInputChange}
              ></input>
            </p>
            <button
              className="my-3 bg-green-500 text-white p-3 px-5 rounded-2xl font-bold w-full"
              onClick={() => props.submitExpenseForm(amount, description)}
            >
              Add
            </button>
            <Button
              class="text-gray-400 rounded-2xl p-3 px-5 font-bold w-full"
              onClick={props.toggleExpenseForm}
              style={{ border: "2px dashed" }}
            >
              Cancel
            </Button>
            <div className="ExpenseForm-buttoncontainer flex justify-end"></div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ExpenseForm;
