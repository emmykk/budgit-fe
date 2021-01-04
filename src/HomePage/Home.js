import React, { useState } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import {
  getNumDaysInMonth,
  getMonthName,
  categoryNamesById,
  getDateWithoutTimeZone,
  getPrettyDate,
} from "../utils.js";
import { unstable_concurrentAct } from "react-dom/test-utils";
import ExpenseForm from "./ExpenseForm.js";
import Expense from "./Expense.js";
import BudgetOverview from "./BudgetOverview";

export default class Home extends React.Component {
  // Props: @token, setToken(token)
  state = {
    expenses: null,
    household: null,
    showExpenseForm: false,
  };

  componentDidMount() {
    this.fetchHouseholdExpenses();
    this.fetchHousehold();
  }

  fetchHousehold = () => {
    const { token } = this.props;
    axios
      .get("/household", {
        headers: {
          Authorization: `bearer ${token.toString()}`,
        },
      })
      .then((response) => this.setState({ household: response.data }))
      .catch((error) => console.log(error));
  };

  fetchHouseholdExpenses = () => {
    const { token } = this.props;
    axios
      .get("/expenses", {
        headers: {
          Authorization: `bearer ${token.toString()}`,
        },
      })
      .then((response) => {
        // Reverse so the most recent expenses are at the top
        const expenses = response.data.body.reverse();
        const expensesByDate = expenses
          ? this.getExpensesByDate(expenses)
          : null;
        this.setState({
          expenses: response.data.body,
          expensesByDate: expensesByDate,
        });
      })
      .catch((error) => console.log(error));
  };

  toggleAddExpenseForm = () => {
    const { showExpenseForm } = this.state;
    this.setState({ showExpenseForm: !showExpenseForm });
  };

  getExpensesByDate = (expenses) => {
    const expensesByDate = {};
    expenses.forEach((expense) => {
      const date = getDateWithoutTimeZone(expense.createdAt);
      if (!expensesByDate[date]) expensesByDate[date] = [expense];
      else if (expensesByDate[date])
        expensesByDate[date] = [...expensesByDate[date], expense];
    });
    return expensesByDate;
  };

  submitExpenseForm = (amount, description) => {
    const { token } = this.props;

    if (amount && description) {
      axios
        .post(
          "/expenses",
          {
            amount,
            description,
          },
          {
            headers: { Authorization: `bearer ${token.toString()}` },
          }
        )
        .then((response) => {
          response.data.message.error
            ? console.log(response.data.message.error)
            : this.setState({
                expenses: [response.data.message.body, ...this.state.expenses],
              });
          this.toggleAddExpenseForm();
        })
        .catch((error) => {
          console.log(error);
          // show errors in form
        });
    }
  };

  render() {
    const { expenses, showExpenseForm, household, expensesByDate } = this.state;
    const totalExpenses = expenses
      ? expenses.reduce((sum, expense) => sum + expense.amount, 0)
      : null;
    // Current date, no time zone
    const currentDate = new Date().toISOString().slice(0, 10);
    const currentDateAsArray = currentDate.split("-");
    const iconForAddExpenseBtn = showExpenseForm ? "-" : "+";

    return (
      <div
        style={{
          margin: "0 5em",
          maxWidth: "400px",
          width: "100%",
          minWidth: "330px",
        }}
        className="HomeContainer shadow-lg white"
      >
        <BudgetOverview
          currentDateAsArray={currentDateAsArray}
          totalExpenses={totalExpenses}
          household={household}
        />
        <div className="flex justify-between p-2 items-center bg-purple-400 pl-5 pr-5">
          <p className="text-lg font-bold text-white ">Expenses</p>
          <div>
            <button
              class="h-9 w-9 rounded-full bg-green-500 text-2xl text-white"
              onClick={this.toggleAddExpenseForm}
            >
              <span className="text-white">{iconForAddExpenseBtn}</span>
            </button>
          </div>
        </div>
        {showExpenseForm ? (
          <ExpenseForm
            submitExpenseForm={this.submitExpenseForm}
            toggleExpenseForm={this.toggleAddExpenseForm}
          />
        ) : null}
        {expensesByDate
          ? Object.keys(expensesByDate).map((date) => (
              <div>
                <div className="bg-gray-200 text-gray-500 pl-5 py-1">
                  {getPrettyDate(...date.split("-")).split(",")[0]}
                </div>
                <div>
                  {expensesByDate[date].map(
                    ({ description, amount, id, CategoryId: categoryId }) => (
                      <Expense
                        id={id}
                        description={description}
                        categoryId={categoryId}
                        amount={amount}
                      />
                    )
                  )}
                </div>
              </div>
            ))
          : null}
      </div>
    );
  }
}
