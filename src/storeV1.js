import {
  combineReducers,
  createStore
} from "redux";


// ========== Initial States =========
const initialStateAccount = {
  balance: 0, loan: 0, loanPurpose: ""
};

const initialStateCustomer = {
  fullName  : "",
  nationalID: "",
  createdAt : ""
};

// ============ Reducer Functions or Action creator

function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state, balance: state.balance + action.payload
      };
    case "account/withdraw":
      return {
        ...state, balance: state.balance - action.payload
      };
    case "account/requestLoan":
      if (state.loan < 0) return state;
      return {
        ...state,
        loan       : action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance    : state.balance + action.payload.amount
      };
    case "account/payLoan":
      return {
        ...state, loan: 0, loanPurpose: "", balance: state.balance - state.loan
      };
    default:
      return state;

  }
}

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName  : action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt : action.payload.createdAt
      };
    case  "customer/updateCustomer":
      return {
        ...state, fullName: action.payload.fullName
      };
    default:
      return state;
  }
}

// ==================== Action Functions for ACCOUNT
function deposit(amount) {
  return {type: "account/deposit", payload: amount};
}

function withdraw(amount) {
  return {type: "account/withdraw", payload: amount};
}

function requestLoad(amount, purpose) {
  return {
    type: "account/requestLoan", payload: {amount, purpose}
  };
}

function payLoan() {
  return {
    type: "account/payLoan"
  };
}

// ==================== Action Functions for CUSTOMER
function createCustomer(fullName, nationalID) {
  return {
    type   : "customer/createCustomer",
    payload: {fullName, nationalID, createdAt: new Date().toISOString()}
  };
}

function updateCustomer(fullName) {
  return {
    type   : "customer/updateCustomer",
    payload: {fullName}
  };
}



// ============= Redux Store =============
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
})
const store = createStore(rootReducer);

// ============= Action Dispatching for account
store.dispatch(deposit(500));
store.dispatch(withdraw(200));
console.log(store.getState());

store.dispatch(requestLoad(1000, "Buyer a car"));

console.log(store.getState());
store.dispatch(payLoan());

console.log(store.getState());

// ============= Action Dispatching for Customer

store.dispatch(createCustomer("Ahmad Iqbal", "34201-45678876-8"))
console.log(store.getState());
store.dispatch(updateCustomer("Ahmad Iqbal Bhatti"));
console.log(store.getState());
