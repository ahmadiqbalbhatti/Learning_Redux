// ========== Initial States =========
const initialStateCustomer = {
  fullName  : "",
  nationalID: "",
  createdAt : ""
};

// ============ Reducer Function
export default function customerReducer(state = initialStateCustomer, action) {
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



// ==================== Action Creators
export function createCustomer(fullName, nationalID) {
  return {
    type   : "customer/createCustomer",
    payload: {fullName, nationalID, createdAt: new Date().toISOString()}
  };
}

export function updateCustomer(fullName) {
  return {
    type   : "customer/updateCustomer",
    payload: {fullName}
  };
}
