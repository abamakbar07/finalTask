import { createContext, useReducer } from 'react'

export const AppContext = createContext();

const initialState = {
   title: 'ubah',
   user: null,
   loading: true,
   bookDetail: false,
}

const reducer = (state, action) => {
   switch (action.type) {
         case "LOGIN_SUCCESS_ADMIN":
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("id", action.payload.id);
            return {
            ...state,
            isLogin: false,
            isAdmin: true,
            user: {
               email: action.payload.email,
               fullName: action.payload.fullName,
            },
            loading: false,
            };
         case "LOGIN_SUCCESS_USER":
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("id", action.payload.id);
            return {
            ...state,
            isLogin: true,
            isAdmin: false,
            user: {
               email: action.payload.email,
               fullName: action.payload.fullName,
            },
            loading: false,
            };
         case "USER_LOADED":
            return {
            ...state,
            isLogin: true,
            isAdmin: true,
            loading: false,
            };
         case "AUTH_ERROR":
         case "REGISTER_SUCCESS":
            return {
            ...state,
            registerStatus: true,
            }
         case "REGISTER_FAILED":
            return {
            ...state,
            registerStatus: false,
            }
         case "LOGOUT":
            localStorage.removeItem("token");
            localStorage.removeItem("id");
            return {
               ...state,
               isLogin: false,
               isAdmin: false,
            }
         default:
            throw new Error();
   }
};

export const AppContextProvider = ({ children }) => {
   const [state, dispatch] = useReducer(reducer, initialState);

   return (
      <AppContext.Provider value={[state, dispatch]}>
         { children }
      </AppContext.Provider>
   )
}
