// ========== Initial States =========
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  balance: 0, loan: 0, loanPurpose: "", isLoading: false
};

// name = slice name

const accountSlice = createSlice({
  name    : "account",
  initialState,
  reducers: {
    // In here we are able to mutate the state directly
    deposit(state, action) {
      state.balance   = state.balance + action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance = state.balance - action.payload;
    },
    requestLoan: {
      prepare(amount, purpose) {
        return {
          payload: {amount, purpose}
        };
      },
      reducer(state, action) {
        if (state.loan < 0) return;
        state.loan        = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance     = state.balance + action.payload.amount;
      }
    },
    payLoan(state) {
      state.balance     = state.balance - state.loan;
      state.loan        = 0;
      state.loanPurpose = "";
    },
    convertingCurrency(state) {
      state.isLoading = true;
    }
  }
});
// console.log(accountSlice.reducer.bind(requestLoan(
//   1000, "asdfad"
// )));

export function deposit(amount, currency) {
  if (currency === "USD") return {type: "account/deposit", payload: amount};

  return async function (dispatch, getState) {
    dispatch({type: "account/convertingCurrency"});
    const host     = "api.frankfurter.app";
    // API call
    const response = await fetch(`https://${host}/latest?amount=${amount}&from=${currency}&to=USD`);
    if (!response.ok) throw new Error(`Failed to Convert the ${currency} to USD`);
    // console.log(response);
    const data            = await response.json();
    const convertedAmount = data.rates.USD;
    // console.log(data);
    // Return action
    dispatch({type: "account/deposit", payload: convertedAmount});
  };

}

export const {payLoan, requestLoan, withdraw} = accountSlice.actions;


export default accountSlice.reducer;
