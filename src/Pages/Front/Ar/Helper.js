export const requestOptions = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: process.env.REACT_APP_FULLBODY_TOKEN_KEY,
  },
};

export const requestOptions_ttxc = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: process.env.REACT_APP_TTXC_TOKEN_KEY,
  },
};

export const requestOptions_openday = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: process.env.REACT_APP_ONENDAY_TOKEN_KEY,
  },
};

export const requestOptions_s168 = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: process.env.REACT_APP_S168_TOKEN_KEY,
  },
};
