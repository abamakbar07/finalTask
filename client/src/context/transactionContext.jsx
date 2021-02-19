import { createContext, useReducer } from 'react'

export const TransactionContext = createContext();

const initialState = {
   transactionStatus: false,
}

const reducer = (state, action) => {
   switch (action.type) {
         case "TRANSACTION_SUCCESS":
            return {
               ...state,
               transactionStatus: true,            
            }
         default:
            throw new Error();
   }
};

export const TransactionContextProvider = ({ children }) => {
   const [state, dispatch] = useReducer(reducer, initialState);

   return (
      <TransactionContext.Provider value={[state, dispatch]}>
         { children }
      </TransactionContext.Provider>
   )
}
