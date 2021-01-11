export const getCookieValByName = (name) => {
  const cookieArr = document.cookie.split(";");

  for (let i = 0; i < cookieArr.length; i++) {
    const cookieNameValuePair = cookieArr[i].split("=");
    const currentCookieName = cookieNameValuePair[0];
    const currentCookieValue = cookieNameValuePair[1];

    if (name === currentCookieName.trim())
      return decodeURIComponent(currentCookieValue);
  }
  return null;
};

export const getDateObj = (dateTimestamp) => {
  const dateTimeAsArray = dateTimestamp.split("-");
  return {
    year: dateTimestamp[0],
    month: dateTimestamp[1],
    day: dateTimestamp[2],
  };
};

export const getNumDaysInMonth = (month, year) =>
  new Date(year, month, 0).getDate();

export const getMonthName = (year, month, day) =>
  // Months are zero indexed, so subtract 1 i.e. january is not month 1, but 0
  new Date(year, month - 1, day).toLocaleString("default", { month: "long" });

export const categoryNamesById = {
  // Matches back-end categories enum.
  1: "food & groceries",
  2: "entertainment",
  3: "miscellaneous",
  4: "housing",
  5: "utilities",
  6: "transportation",
};

export const categoryIconsById = {
  3: "✨",
};

// Separate a double into its whole and fractional - post decimal - parts
export const getSplitCurrency = (number) => number.split(".");

export const getDateWithoutTimeZone = (timeDateStamp) =>
  timeDateStamp.slice(0, timeDateStamp.indexOf("T"));

export const getPrettyDate = (year, month, day) => {
  const monthName = getMonthName(year, month, day);
  return `${monthName} ${day}, ${year}`;
};

export const priceNumberFormat = new Intl.NumberFormat("en-US", {
  minimumIntegerDigits: 1,
  minimumFractionDigits: 2,
});

export const budgitJWTCookieName = "budgitToken";
