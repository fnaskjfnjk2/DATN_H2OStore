import { useReducer } from "react";
import UserContext from "./use.context";
import UserReducer, { InitState } from "./use.reducer";

function UserProvider({ children }) {
  const [state, dispatch] = useReducer(UserReducer, InitState);

 
}
export default UserProvider;
