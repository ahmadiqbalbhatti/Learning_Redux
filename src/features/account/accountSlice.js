// ========== Initial States =========
const initialStateAccount = {
  balance: 0, loan: 0, loanPurpose: "", isLoading: false
};

// ============ Reducer Functions or Action creator

export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state, balance: state.balance + action.payload, isLoading: false
      };
    case "account/withdraw":
      return {
        ...state, balance: state.balance - action.payload
      };
    case "account/requestLoan":
      if (state.loan < 0) return state;
      return {
        ...state,
        loan       : action.payload.amount + state.loan,
        loanPurpose: action.payload.purpose,
        balance    : state.balance + action.payload.amount
      };
    case "account/payLoan":
      return {
        ...state, loan: 0, loanPurpose: "", balance: state.balance - state.loan
      };
    case "account/convertingCurrency":
      return {
        ...state, isLoading: true
      };
    default:
      return state;

  }
}

// ==================== Action Creators
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

export function withdraw(amount) {
  return {type: "account/withdraw", payload: amount};
}

export function requestLoad(amount, purpose) {
  return {
    type: "account/requestLoan", payload: {amount, purpose}
  };
}

export function payLoan() {
  return {
    type: "account/payLoan"
  };
}
